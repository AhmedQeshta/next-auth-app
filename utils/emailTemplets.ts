export const newUserEmail = (email: string, url: string, password?: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        :root {
          --primary-color: #ffdf2d;
          --secondary-color: #4c4c4c;
          --tertiary-color: #000000;
          --quaternary-color: #ffffff;
          --box-shadow-color: rgba(0, 0, 0, 0.2);
          --border-radius: 10px;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          background: var(--quaternary-color);
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100vh;
          align-items: center;
          font-family: Arial, Helvetica, sans-serif;
          font-style: 16px;
          max-width: 650px;
          margin: 0 auto;
        }
        header {
          width: 100%;
          background: var(--secondary-color);
          color: var(--primary-color);
          padding: 20px;
          border-radius: var(--border-radius);
          box-shadow: 0 0 10px var(--box-shadow-color);
          margin: 15px 0;
          text-align: center;
        }
  
        footer {
          width: 100%;
          background: var(--secondary-color);
          color: var(--primary-color);
          padding: 20px;
          border-radius: var(--border-radius);
          box-shadow: 0 0 10px var(--box-shadow-color);
          margin-top: auto;
          margin-bottom: 15px;
          text-align: center;
        }
        main {
          width: 100%;
          background: var(--quaternary-color);
          color: var(--secondary-color);
          padding: 20px;
          border-radius: var(--border-radius);
          box-shadow: 0 0 10px var(--box-shadow-color);
          margin: 15px 0;
          height: inherit;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        main > div:first-child {
          text-align: center;
          font-size: 30px;
          font-weight: bold;
          padding: 15px;
          border-radius: var(--border-radius);
          background: var(--primary-color);
          color: var(--secondary-color);
        }
  
        main > div:last-child {
          display: flex;
          flex-direction: column;
          /* justify-content: center;
          align-items: center; */
          gap: 30px;
          height: 100%;
        }
  
        main > div > p {
          line-height: 1.5;
        }
  
        main > div > a {
          text-decoration: none;
          color: var(--primary-color);
          background: var(--tertiary-color);
          padding: 12px;
          border-radius: var(--border-radius);
          font-weight: bold;
          width: 200px;
          text-align: center;
          margin: 0 auto;
        }
      </style>
    </head>
    <body>
      <header>
        <h2>Welcome to NextAPI</h2>
      </header>
  
      <main>
      ${password ? '<div>Thank you for signing up!</div>' : '<div>Welcome Back!</div>'}  
        <div>
          <p>
          ${
            password ? ' Thank you for registering with us, and welcome!' : 'Welcome Back!'
          }   We are overjoyed to welcome you to our
            community. We are dedicated to giving you a satisfying and enjoyable experience, whether
            you are visiting to study, connect, or simply to explore. You can access all of our
            features and materials as a registered user, including premium content, discussion boards,
            and tailored suggestions. We are delighted to accompany you on your journey since we think
            that learning and development are ongoing activities.
          </p>
          <p>
            Once more, welcome to our neighborhood! We are eager to get to know you and support you as
            you pursue your objectives. You can log in with these details:
          </p>
          <div>
            <p>Your Email is : ${email}</p>
            ${password ? `<p>Your password is : ${password}</p>` : ''} 
          </div>
          <a title="${url}" href="${url}?email=${email}" target="_blank">Click here to login</a>
        </div>
      </main>
  
      <footer>
        <p>NextAPI &copy; ${new Date().getFullYear()} - written with ❤ by Ahmed Qeshta</p>
      </footer>
    </body>
  </html>
  
  `;
};
