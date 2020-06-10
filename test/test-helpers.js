const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      password: 'testPass123!',
      first_name: 'Test FN1',
      last_name: 'Test LN1',
      github_url: 'https://github.com',
      linkedin_url: 'https://linkedin.com'
    },
    {
      id: 2,
      username: 'test-user-2',
      password: 'testPass123!',
      first_name: 'Test FN2',
      last_name: 'Test LN2'
    },
    {
      id: 3,
      username: 'test-user-3',
      password: 'testPass123!',
      first_name: 'Test FN3',
      last_name: 'Test LN3'
    },
    {
      id: 4,
      username: 'test-user-4',
      password: 'testPass123!',
      first_name: 'Test FN4',
      last_name: 'Test LN4'
    }
  ];
}

function makeProjectsArray(users) {
  return [
    {
      id: 1,
      name: 'Test Proj 1',
      creator_id: users[0].id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      date_created: '2029-01-22T16:28:32.615Z',
      handle: 'test-proj-1',
    },
    {
      id: 2,
      name: 'Test Proj 2',
      handle: 'test-proj-2',
      creator_id: users[1].id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      date_created: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 3,
      name: 'Test Proj 3',
      handle: 'test-proj-3',
      creator_id: users[2].id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      date_created: '2029-01-22T16:28:32.615Z'
    }
  ];
}

function makeVacanciesArray(users, projects) {
  return [
    {
      id: 1,
      project_id: projects[0].id,
      title: 'Test vacancy 1',
      user_id: null,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      skills: []
    },
    {
      id: 2,
      project_id: projects[1].id,
      title: 'Test vacancy 2',
      user_id: null,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      skills: []
    },
    {
      id: 3,
      project_id: projects[2].id,
      title: 'Test vacancy 3',
      user_id: users[2].id,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      skills: []
    }
  ];
}

function makeRequestsArray(users, vacancies) {
  return [
    {
      id: 1,
      vacancy_id: vacancies[0].id,
      user_id: users[0].id,
      status: 'pending'
    },
    {
      id: 2,
      vacancy_id: vacancies[1].id,
      user_id: users[1].id,
      status: 'denied'
    },
    {
      id: 3,
      vacancy_id: vacancies[2].id,
      user_id: users[2].id,
      status: 'approved'
    }
  ];
}

function makePostsArray(users, projects) {
  return [
    {
      id: 1,
      project_id: projects[0].id,
      user_id: users[0].id,
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      date_created: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 2,
      project_id: projects[1].id,
      user_id: users[1].id,
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      date_created: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 3,
      project_id: projects[2].id,
      user_id: users[2].id,
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      date_created: '2029-01-22T16:28:32.615Z'
    }
  ];
}

function makeChatsArray(users, requests) {
  return [
    {
      id: 1,
      request_id: requests[0].id,
      author_id: users[0].id,
      recipient_id: users[1].id
    },
    {
      id: 2,
      request_id: requests[1].id,
      author_id: users[1].id,
      recipient_id: users[2].id
    },
    {
      id: 3,
      request_id: requests[2].id,
      author_id: users[2].id,
      recipient_id: users[3].id
    }
  ];
}

function makeMessagesArray(users, chats) {
  return [
    {
      id: 1,
      chat_id: chats[0].id,
      author_id: users[0].id,
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      date_created: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 2,
      chat_id: chats[1].id,
      author_id: users[1].id,
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      date_created: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 3,
      chat_id: chats[2].id,
      author_id: users[2].id,
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      date_created: '2029-01-22T16:28:32.615Z'
    }
  ];
}

function makeNotificationsArray(users, projects) {
  return [
    {
      id: 1,
      recipient_id: users[0].id,
      project_id: projects[0].id,
      type: 'join',
      date_created: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 2,
      recipient_id: users[1].id,
      project_id: projects[1].id,
      type: 'leave',
      date_created: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 3,
      recipient_id: users[2].id,
      project_id: projects[2].id,
      type: 'post',
      date_created: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 4,
      recipient_id: users[0].id,
      project_id: projects[2].id,
      type: 'chat',
      date_created: '2029-01-22T16:28:32.615Z'
    }
  ];
}

function seedUsers(db, users) {
  const usersHashedPw = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));

  return db
    .into('users')
    .insert(usersHashedPw)
    .returning('*')
    .then(() => {
      //update autoseqencer
      return db.raw(`SELECT setval('users_id_seq', ?)`, [
        users[users.length - 1].id
      ]);
    });
}

function seedProjectsTables(
  db,
  users,
  projects,
  vacancies,
  requests,
  posts,
  chats,
  messages,
  notifications
) {
  let tables = {
    projects,
    vacancies,
    requests,
    posts,
    chats,
    messages,
    notifications
  };

  return db.transaction(async trx => {
    await seedUsers(trx, users);
    for (const key in tables) {
      if (tables[key]) {
        await trx.into(`${key}`).insert(tables[key]);
        await trx.raw(`SELECT setval('${key}_id_seq', ?)`, [
          tables[key][tables[key].length - 1].id
        ]);
      }
    }
  });
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
          users
          RESTART IDENTITY CASCADE
        `
    )
  );
}

function makeFixtures() {
  const testUsers = makeUsersArray();
  const testProjects = makeProjectsArray(testUsers);
  const testVacancies = makeVacanciesArray(testUsers, testProjects);
  const testRequests = makeRequestsArray(testUsers, testVacancies);
  const testPosts = makePostsArray(testUsers, testProjects);
  const testChats = makeChatsArray(testUsers, testRequests);
  const testMessages = makeMessagesArray(testUsers, testChats);
  const testNotifications = makeNotificationsArray(testUsers, testProjects);

  return {
    testUsers,
    testRequests,
    testProjects,
    testVacancies,
    testPosts,
    testChats,
    testMessages,
    testNotifications
  };
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign(
    {
      first_name: user.first_name,
      last_name: user.last_name
    },
    secret,
    {
      subject: user.username,
      algorithm: 'HS256'
    }
  );
  return `Bearer ${token}`;
}

function makeExpectedProjects(projects, vacancies) {
  let filteredProjects = projects.filter(project => {
    return vacancies.find(
      vacancy => vacancy.project_id === project.id && vacancy.user_id == null
    );
  });


  return filteredProjects.map(project => {
    let openVacancies = vacancies.filter(vacancy => { 
      return vacancy.project_id === project.id && vacancy.user_id == null})
      
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      tags: null,
      live_url: null,
      trello_url: null,
      github_url: null,
      date_created: project.date_created,
      handle: project.handle,
      openVacancies: openVacancies.length.toString(),
    };
  });
}

function makeExpectedUserProjects(user_id, projects, vacancies) {
  let userProjects = projects.filter(project => project.creator_id === user_id);

  return userProjects.map(project => {
    let openVacancies = vacancies.filter(vacancy => { 
      return vacancy.project_id === project.id && vacancy.user_id == null})
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      tags: null,
      live_url: null,
      trello_url: null,
      github_url: null,
      date_created: project.date_created,
      handle: project.handle,
      openVacancies: openVacancies.length.toString(),
    };
  });
}

function makeExpectedPosts(user, posts, project_id) {
  let projPosts = posts.filter(post => post.project_id === project_id);

  return projPosts.map(post => {
    return {
      id: post.id,
      message: post.message,
      date_created: post.date_created,
      first_name: user.first_name,
      last_name: user.last_name,
      canEdit: post.user_id === user.id
    };
  });
}

function makeExpectedRequests(users, requests, vacancies, vacancy_id) {
  let projRequests = requests.filter(
    request => request.vacancy_id === vacancy_id
  );
  return projRequests.map(request => {
    let vacancy = vacancies.find(vacancy => vacancy.id === request.vacancy_id);
    let user = users.find(user => user.id === request.user_id);

    return {
      id: request.id,
      vacancy_id: request.vacancy_id,
      vacancy_title: vacancy.title,
      username: user.username,
      status: request.status,
      project_id: vacancy.project_id,
      first_name: user.first_name,
      last_name: user.last_name
    };
  });
}

function makeExpectedVacancies(
  users,
  user_id,
  vacancies,
  requests,
  project_id
) {
  let projVacancies = vacancies.filter(
    vacancy => vacancy.project_id === project_id
  );

  return projVacancies.map(vacancy => {
    let user = users.filter(user => user.id === vacancy.user_id);

    let request = requests.find(
      request =>
        request.vacancy_id === vacancy.id && request.user_id === user_id
    ) || { status: null };
    return {
      id: vacancy.id,
      project_id: vacancy.project_id,
      request_status: request.status,
      first_name: user.id ? user.first_name : null,
      last_name: user.id ? user.last_name : null,
      username: user.id ? user.username : null,
      title: vacancy.title,
      description: vacancy.description,
      skills: vacancy.skills
    };
  });
}

function makeExpectedNotifications(user_id, notifications) {
  let userNotifications = notifications.filter(
    item => item.recipient_id === user_id
  );

  return userNotifications.map(notification => {
    return {
      id: notification.id,
      recipient_id: notification.recipient_id,
      project_id: notification.project_id,
      type: notification.type,
      seen: false,
      date_created: '2029-01-22T16:28:32.615Z'
    };
  });
}

//get chat/:chat_id
function makeExpectedMessages(chat_id, user_id, users, messages) {
  let chatMessages = messages.filter(message => message.chat_id === chat_id);

  return chatMessages.map(message => {
    let user = users.find(user => user.id === message.author_id);
    return {
      body: message.body,
      isAuthor: messages.author_username !== user.username,
      author: user.first_name,
      author_username: user.username,
      date_created: message.date_created
    };
  });
}

function makeExpectedChats(
  chats,
  user_id,
  users,
  projects,
  messages,
  requests,
  vacancies
) {
  //user_id for user who is GETting the chats
  let userChats = chats.filter(
    chat => chat.author_id === user_id || chat.recipient_id === user_id
  );

  return userChats.map(chat => {
    let request = requests.find(request => request.id === chat.request_id);
    let vacancy = vacancies.find(vacancy => vacancy.id === request.vacancy_id);
    let project = projects.find(project => project.id === vacancy.project_id);
    let message = messages.find(message => message.chat_id === chat.id);
    let recipient = users.find(user => user.id === chat.recipient_id);

    return {
      body: message.body,
      chat_id: chat.id,
      closed: false,
      date_created: message.date_created,
      first_name: recipient.first_name,
      last_name: recipient.last_name,
      project_name: project.name,
      recipient_username: recipient.username,
      request_id: request.id,
      request_status: request.status,
      vacancy_name: vacancy.title
    };
  });
}

module.exports = {
  makeUsersArray,
  makeProjectsArray,
  makeVacanciesArray,
  makeRequestsArray,
  makePostsArray,
  makeChatsArray,
  makeMessagesArray,
  makeNotificationsArray,

  makeExpectedProjects,
  makeExpectedUserProjects,
  makeExpectedVacancies,
  makeExpectedRequests,
  makeExpectedPosts,
  makeExpectedChats,
  makeExpectedMessages,
  makeExpectedNotifications,

  makeAuthHeader,
  makeFixtures,
  seedProjectsTables,
  seedUsers,
  cleanTables
};
