const { db } = require( '@vercel/postgres' );
const {
    USERS,
    RESUME,
    SECTION,
    PROJECT,
    MEDIA,
    SOCIAL_MEDIA
  } = require( '../app/lib/placeholder-data.js' );
const bcrypt = require( 'bcrypt' );

async function dropTables( client ) {
    try {
        await client.sql`DROP TABLE IF EXISTS USERS CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS RESUME CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS SECTION CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS PROJECT CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS MEDIA CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS SOCIAL_MEDIA CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS SOCIAL_MEDIA_USER CASCADE;`;
        console.log( 'Tables deleted' );

    } catch ( error ) {
        console.error('Error seeding users:', error);
        throw error;
      }
}

async function createUsers( client ) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        
        // Create the "USERS" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS USERS (
            user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password TEXT NOT NULL,
            photo_profile_id UUID
            );
            `;
    
        console.log( `Created "USERS" table` );

        return createTable;
      } catch ( error ) {
        console.error('Error create users:', error);
        throw error;
      }
}

async function createResume( client ) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS RESUME (
            resume_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            user_id UUID
            );
            `;
    
        console.log( `Created "RESUME" table` );
        return createTable;
      } catch (error) {
        console.error( 'Error create resumes:', error );
        throw error;
      }
}

async function createSection( client ) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS SECTION (
            section_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            visible BOOLEAN DEFAULT TRUE,
            type VARCHAR(20) CHECK (type IN ('Projects', 'Gallery', 'Custom', 'Home')),
            style INT DEFAULT 1,
            backgroundColor VARCHAR(7) DEFAULT '#FFFFFF',
            backgroundImage VARCHAR(255),
            
            resume_id UUID
          );
        `;
    
        console.log(`Created "SECTION" table`);
        return createTable;
      } catch ( error ) {
        console.error( 'Error creating sections:', error );
        throw error;
      }
}

async function createProject( client ) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "USERS" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS PROJECT (
            project_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            link VARCHAR(255),
            technologies VARCHAR(255),
            description TEXT,
            moreInfo TEXT,
            team VARCHAR(255)
          );
        `;
    
        console.log( `Created "PROJECT" table` );
    
        return createTable;

      } catch ( error ) {
        console.error( 'Error create projects:', error );
        throw error;
      }
}

async function createMedia( client ) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        
        // Create the "USERS" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS MEDIA (
            media_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            filename TEXT NOT NULL,
            url TEXT NOT NULL,
            downloadUrl TEXT NOT NULL,
            contentType VARCHAR(255) NOT NULL,
            position INT,
            isHero BOOLEAN DEFAULT False,

            section_id UUID,
            project_id UUID
          );
        `;
    
        return createTable;

      } catch ( error ) {
        console.error( 'Error creating medias:', error );
        throw error;
      }
}

async function createSocialMedia( client ) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "USERS" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS SOCIAL_MEDIA (
            social_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            icon VARCHAR(255) NOT NULL
          );
        `;
    
        console.log( `Created "SOCIAL_MEDIA" table` );
        return createTable;
      } catch ( error ) {
        console.error( 'Error creating social medias:', error );
        throw error;
      }
}

async function createSocialMediaUser( client ) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "USERS" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS SOCIAL_MEDIA_USER (
            user_id UUID,
            social_id UUID,
            link VARCHAR(255) NOT NULL,
            username VARCHAR(255),

            PRIMARY KEY (user_id, social_id)
          );
        `;
    
        console.log(`Created "SOCIAL_MEDIA" table`);
    
        return createTable

      } catch ( error ) {
        console.error( 'Error creating social medias:', error );
        throw error;
      }
}

async function seedTables( client ) {
  await seedUsers( client );
  await seedResume( client );
  await seedSection( client );

  await seedProject( client );
  await seedMedia( client );
  await seedSocialMedia( client );
  await seedSocialMediaUser( client );
  return;
}

async function createTables( client ) {
  await createUsers( client );
  await createResume( client );
  await createSection( client );

  await createProject( client );
  await createMedia( client );
  await createSocialMedia( client );
  await createSocialMediaUser( client );
  return;
}

async function createForeignKeys( client ) {
  try {
    await client.sql`ALTER TABLE USERS
      ADD CONSTRAINT fk_users_media FOREIGN KEY (photo_profile_id) REFERENCES MEDIA(media_id) ON UPDATE CASCADE ON DELETE CASCADE;`;
    
    await client.sql`ALTER TABLE RESUME
      ADD CONSTRAINT fk_resume_users FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON UPDATE CASCADE ON DELETE CASCADE;`;
    
    await client.sql`ALTER TABLE SECTION
      ADD CONSTRAINT fk_section_resume FOREIGN KEY (resume_id) REFERENCES RESUME(resume_id) ON UPDATE CASCADE ON DELETE CASCADE;`;
    
    await client.sql`ALTER TABLE MEDIA
      ADD CONSTRAINT fk_media_section FOREIGN KEY (section_id) REFERENCES SECTION(section_id) ON UPDATE CASCADE ON DELETE CASCADE;`;
  
    await client.sql`ALTER TABLE MEDIA
      ADD CONSTRAINT fk_media_project FOREIGN KEY (project_id) REFERENCES PROJECT(project_id) ON UPDATE CASCADE ON DELETE CASCADE;`;
  
    await client.sql`ALTER TABLE SOCIAL_MEDIA_USER
      ADD CONSTRAINT fk_user_socialmedia FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON UPDATE CASCADE ON DELETE CASCADE;`;
  
    await client.sql`ALTER TABLE SOCIAL_MEDIA_USER
      ADD CONSTRAINT fk_socialmedia_user FOREIGN KEY (social_id) REFERENCES SOCIAL_MEDIA(social_id) ON UPDATE CASCADE ON DELETE CASCADE;`;
  } catch( e ) {
    console.log('Error generating foreign keys', e);
    throw new Error( e );
  }

  return;
}

async function main() {
    const client = await db.connect();
    
    await dropTables( client );
    await createTables( client );
    await createForeignKeys( client );
    await seedTables( client );


    await client.end();
  }

main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
});

async function seedUsers( client ) {
  try {  
      const insertedUsers = await Promise.all(
        
          USERS.map( async ( user ) => {

          const hashedPassword = await bcrypt.hash( user.password, 10 );
          let users = await client.sql`
          INSERT INTO USERS ( user_id, username, firstname, lastname, email, password )
          VALUES ( ${user.user_id}, ${user.username}, ${user.firstname}, ${user.lastname}, ${user.email}, ${hashedPassword} )
          ON CONFLICT ( user_id ) DO NOTHING
          RETURNING user_id;
        `;
            console.log('inserted users', users);
          return users;
        } ),
      );
  
      console.log( `Seeded : ${insertedUsers.length} users` );
  
      return {
        users: insertedUsers
      };
    } catch ( error ) {
      console.error('Error seeding users:', error);
      throw error;
    }
}

async function seedResume( client ) {
  try {
      const insertedResumes = await Promise.all(
        
          RESUME.map( async ( resume ) => {
          
          return client.sql`
          INSERT INTO RESUME ( resume_id, user_id )
          VALUES ( ${resume.resume_id}, ${resume.user_id} )
          ON CONFLICT ( resume_id ) DO NOTHING;
        `;
        } ),
      );
  
      console.log( `Seeded : ${insertedResumes.length} resumes` );
  
      return {
        resumes: insertedResumes,
      };
    } catch (error) {
      console.error( 'Error seeding resumes:', error );
      throw error;
    }
}

async function seedSection( client ) {
  try {
      const insertedSections = await Promise.all(
        
          SECTION.map( async ( section ) => {

          return client.sql`
          INSERT INTO SECTION ( section_id, name, visible, type, style, backgroundColor, backgroundImage, resume_id )
          VALUES ( ${section.section_id}, ${section.name}, ${section.visible}, ${section.type}, ${section.style}, ${section.backgroundColor}, ${section.backgroundImage}, ${section.resume_id})
          ON CONFLICT ( section_id ) DO NOTHING;
        `;
        } ),
      );
  
      console.log( `Seeded : ${insertedSections.length} sections` );
  
      return {
        users: insertedSections,
      };
    } catch ( error ) {
      console.error( 'Error seeding sections:', error );
      throw error;
    }
}

async function seedProject( client ) {
  try {

        const insertedProjects = await Promise.all(
        
          PROJECT.map( async ( project ) => {

          return client.sql`
          INSERT INTO PROJECT ( project_id, name, link, technologies, description, moreInfo, team )
          VALUES ( ${project.project_id}, ${project.name}, ${project.link}, ${project.technologies}, ${project.description}, ${project.moreInfo}, ${project.team} )
          ON CONFLICT ( project_id ) DO NOTHING;
        `;
        } ),
      );
  
      console.log( `Seeded : ${insertedProjects.length} projects` );
  
      return {
        users: insertedProjects,
      };
    } catch ( error ) {
      console.error( 'Error seeding projects:', error );
      throw error;
    }
}

async function seedMedia( client ) {
  try {
      // Insert data into the "PROJECT" table
      /*const insertedMedias = await Promise.all(
        
          MEDIA.map( async ( media ) => {

          return client.sql`
          INSERT INTO MEDIA ( media_id, filename, position, section_id, project_id )
          VALUES ( ${media.media_id}, ${media.filename}, ${media.position}, ${media.section_id}, ${media.project_id} )
          ON CONFLICT ( media_id ) DO NOTHING;
        `;
        } ),
      );*/
  
      //console.log( `Seeded : ${insertedMedias.length} medias` );
  
      return {
        //users: insertedMedias,
      };
    } catch ( error ) {
      console.error( 'Error seeding medias:', error );
      throw error;
    }
}

async function seedSocialMedia( client ) {
  try {
      // Insert data into the "PROJECT" table
      const insertedSocialMedias = await Promise.all(
        
          SOCIAL_MEDIA.map( async ( social_media ) => {

          return client.sql`
          INSERT INTO SOCIAL_MEDIA ( social_id, name, icon )
          VALUES ( ${social_media.social_id}, ${social_media.name}, ${social_media.icon} )
          ON CONFLICT ( social_id ) DO NOTHING;
        `;
        } ),
      );
  
      console.log( `Seeded : ${insertedSocialMedias.length} social medias` );
  
      return {
        users: insertedSocialMedias,
      };
    } catch ( error ) {
      console.error( 'Error seeding social medias:', error );
      throw error;
    }
}

async function seedSocialMediaUser( client ) {
    try {
        return {};

      } catch ( error ) {
        console.error( 'Error seeding social medias:', error );
        throw error;
      }
}