const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path');
const app = express();
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', 'templates')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'css')));


// midlwares
function midd(req, res, next) {
  let cookie = req.cookies.jwt;
  if (cookie && cookie != undefined) {
    next();
  } else {
    res.redirect('/login');
  }
}
function middProMax(req, res, next) {
  let cookie = req.cookies.jwt;
  if (cookie) {
    res.redirect('/home');
  } else {
    next();
  }
}
async function queryFetch(graphqlQuery, jwtToken) {
  try {
    const response = await fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${jwtToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(graphqlQuery)
    });

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error in GraphQL request:", error);
    throw error;
  }
}
// Routes

app.get('/', (req, res) => {
  res.redirect('/login');
});
app.get('/login', middProMax, (req, res) => {
  res.render('index', { error: null });
});
app.get('/home', midd, (req, res) => {
  res.render('home')
})
app.post('/home', async (req, res) => {
  const { username, password } = req.body;
  const encoded = btoa(`${username}:${password}`);
  try {
    const result = await fetch('https://zone01normandie.org/api/auth/signin', {
      method: 'post',
      headers: {
        "Authorization": `Basic ${encoded}`
      }

    })
    const data = await result.json()
    if (data.error) {
      res.render('index', { error: "User does not exist or password incorrect" });
    }
    res.cookie('jwt', data, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
    res.redirect('/home');

  } catch (error) {
    console.error(error)
  }
});
app.get('/logout', (req, res) => {
  res.clearCookie("jwt")
  res.redirect("/login")
});

app.get('/api/graphql', async (req, res) => {
  const jwtToken = req.cookies.jwt;
  const graphqlQuery = {
    query: `
    {
      user {
        id
        login
        attrs
        email
        campus
        profile
        lastName
        firstName
        auditRatio
        totalUp
        totalDown
        roles { slug }
        labels { labelName, labelId }
        records {
          banEndAt
          message
        }
        xps {
          amount
          path
          originEventId
        }
        events(where: {
          _or: [
            { eventId: { _eq: 148 } },
            { eventId: { _eq: 32 } }
          ]
        }) {
          level
        }
      }
      transaction(where: {type: {_eq: "xp"}, path: {_ilike: "%div-01%"}}
      order_by: {createdAt: asc}) 
      { 
        type
        amount
        path
        createdAt
        object {
          name
        }
      }
      audit(
        where: {
          grade: { _is_null: true },
          resultId: { _is_null: true },
          private: {code: {_is_null: false}}
        }
        order_by: {endAt: asc_nulls_last, createdAt: asc}
      ) {
        id
        group {
          id
          path
          captainLogin
          captain {
            isAvailable
          }
        }
        private { code }
        createdAt
        endAt
        version
        grade
      }
    }
  `
  };
  try {
    const data = await queryFetch(graphqlQuery, jwtToken);
    let username = data.user[0].login;

    let lastActQuery = {
      query: `
        {
          group(where: {
            members: { userLogin: { _eq: "${username}"} },
            status: { _eq: finished}
          },
          order_by: { updatedAt: desc }) {
            path
            object { 
              type
            }
          }
        }
      `
    };
    let projectOnQuery = {
      query: `
        {
          group(where: {
            members: { userLogin: { _eq: "${username}"} },
            _and: { _not: { status: { _eq: finished }}}
          },
          order_by: { createdAt: desc },
          limit: 1) {
            path
            status
            createdAt
            updatedAt
            object {
              name
            }
          }
        }
      `
    };
    let skillsQuery = {
      query: `
        {
          user {
            transactions (
              order_by: [{ type: desc }, { amount: desc }]
              distinct_on: [type]
              where: { type: { _like: "skill_%" } }
            ) {
              type
              amount
            }
          }
        }
      `
    };
    let last_act = await queryFetch(lastActQuery, jwtToken)
    let project_on = await queryFetch(projectOnQuery, jwtToken)
    let skils = await queryFetch(skillsQuery, jwtToken)

    res.json({ data, last_act, project_on, skils });
  } catch (error) {
    console.error(error)
  }
});

const port = 8081;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});