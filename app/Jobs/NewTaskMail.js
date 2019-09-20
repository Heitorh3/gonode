'use strict';

const Mail = use('Mail');
const Helpers = use('Helpers');

class NewTaskMail {
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'NewTaskMail-job';
  }

  // This is where the work is done.
  async handle({ email, username, title, file }) {
    console.log(`Job: ${NewTaskMail.key} started`);

    await Mail.send(
      ['emails.new_task'],
      {
        username,
        title,
        hasAttachment: !!file,
      },
      message => {
        message
          .to(email)
          .from('heitorh3@gmail.com', 'Heitor Neto')
          .subject('Uma nova tarefa foi atribuida a voce');

        if (file) {
          message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
            filename: file.name,
          });
        }
      }
    );
  }
}

module.exports = NewTaskMail;
