const { db } = require( '@vercel/postgres' );
const {
    USERS,
    RESUME,
    SECTION,
    MEDIA,
    SOCIAL_MEDIA
  } = require( '../app/lib/placeholder-data.js' );
const bcrypt = require( 'bcrypt' );

async function dropTables( client ) {
    try {
        await client.sql`DROP TABLE IF EXISTS USERS CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS USER_FOLLOW_USER CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS RESUME CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS SECTION CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS MEDIA CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS SOCIAL_MEDIA CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS SOCIAL_MEDIA_USER CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS BLOCK CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS ELEMENT CASCADE;`;
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
          showheader BOOLEAN DEFAULT TRUE,
          url_hero VARCHAR(255),
          url_profile VARCHAR(255)
          );
          `;
  
      console.log( `Created "USERS" table` );

      return createTable;
    } catch ( error ) {
      console.error('Error create users:', error);
      throw error;
    }
}

async function createUser_Folow_User( client ) {
  try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      
      // Create the "USERS" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS USER_FOLLOW_USER (
          user_id UUID,
          user_id_followed UUID,

          PRIMARY KEY (user_id, user_id_followed)
          );
          `;
  
      console.log( `Created "USER_FOLLOW_USER" table` );

      return createTable;
    } catch ( error ) {
      console.error('Error create user follow user:', error);
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
            public BOOLEAN DEFAULT TRUE,
            ishome BOOLEAN DEFAULT FALSE,
            css VARCHAR(255),
            
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

async function createMedia( client ) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        
        // Create the "USERS" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS MEDIA (
            media_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            filename TEXT NOT NULL,
            key TEXT NOT NULL,
            url TEXT NOT NULL,
            contenttype VARCHAR(255) NOT NULL,
            size INT NOT NULL,

            user_id UUID
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

        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS SOCIAL_MEDIA_USER (
            user_id UUID,
            social_id UUID,
            link VARCHAR(255) NOT NULL,
            username VARCHAR(255),

            PRIMARY KEY (user_id, social_id)
          );
        `;
    
        console.log(`Created "SOCIAL_MEDIA USER" table`);
    
        return createTable

      } catch ( error ) {
        console.error( 'Error creating social medias:', error );
        throw error;
      }
}

async function createBlock( client ) {
  try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      
      // Create the "USERS" table if it doesn't exist
      await client.sql`DROP TYPE type_screen;`;
      await client.sql`CREATE TYPE type_screen AS ENUM ('def', 'md', 'lg', 'xl', '2xl');`

      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS BLOCK (
          block_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          numlines INT DEFAULT 12,
          numcols INT DEFAULT 12,
          defclassName TEXT NOT NULL,
          customclassname TEXT,
          css TEXT,

          place INT,
          screen type_screen,

          section_id UUID NOT NULL
        );
      `;
      console.log( `Created "BLOCK" table` );
      return createTable;

    } catch ( error ) {
      console.error( 'Error creating block:', error );
      throw error;
    }
}

async function createElement( client ) {
  try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      
      // Create the "USERS" table if it doesn't exist
      await client.sql`DROP TYPE type_element;`;
      await client.sql`CREATE TYPE type_element AS ENUM ('text', 'media', 'linkvideo', 'html');`

      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS ELEMENT (
          element_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          linefrom INT NOT NULL,
          lineto INT NOT NULL,
          colfrom INT NOT NULL,
          colto INT NOT NULL,
          defclassname TEXT NOT NULL,
          customclassname TEXT,
          css TEXT,
          content TEXT,
          type type_element,

          block_id UUID NOT NULL,
          element_id_ref UUID NOT NULL
        );
      `;
      console.log( `Created "ELEMENT" table` );
      return createTable;

    } catch ( error ) {
      console.error( 'Error creating element:', error );
      throw error;
    }
}

async function createTables( client ) {
  await createUsers( client );
  await createUser_Folow_User( client );
  await createResume( client );
  await createSection( client );

  await createMedia( client );
  await createSocialMedia( client );
  await createSocialMediaUser( client );

  await createBlock( client );
  await createElement( client );
}

async function createForeignKeys( client ) {
  try {

    // USER_FOLLOW_USER
    await client.sql`ALTER TABLE USER_FOLLOW_USER
      ADD CONSTRAINT fk_user_follow_user FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
      ADD CONSTRAINT fk_user_followed_by_user FOREIGN KEY (user_id_followed) REFERENCES USERS(user_id) ON UPDATE CASCADE ON DELETE CASCADE;`;

    // RESUME
    await client.sql`ALTER TABLE RESUME
      ADD CONSTRAINT fk_resume_users FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON UPDATE CASCADE ON DELETE CASCADE;`;

    // SECTION
    await client.sql`ALTER TABLE SECTION
      ADD CONSTRAINT fk_section_resume FOREIGN KEY (resume_id) REFERENCES RESUME(resume_id) ON UPDATE CASCADE ON DELETE CASCADE;`;
    
    // MEDIA
    await client.sql`ALTER TABLE MEDIA
      ADD CONSTRAINT fk_media_user FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON UPDATE CASCADE ON DELETE CASCADE;`;
  
    // SOCIAL_MEDIA_USER
    await client.sql`ALTER TABLE SOCIAL_MEDIA_USER
      ADD CONSTRAINT fk_user_socialmedia FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
      ADD CONSTRAINT fk_socialmedia_user FOREIGN KEY (social_id) REFERENCES SOCIAL_MEDIA(social_id) ON UPDATE CASCADE ON DELETE CASCADE;`;
    
    // BLOCK
    await client.sql`ALTER TABLE BLOCK
      ADD CONSTRAINT fk_block_section FOREIGN KEY (section_id) REFERENCES SECTION(section_id) ON UPDATE CASCADE ON DELETE CASCADE;`;

    // ELEMENT
    await client.sql`ALTER TABLE ELEMENT
      ADD CONSTRAINT fk_element_block FOREIGN KEY (block_id) REFERENCES BLOCK(block_id) ON UPDATE CASCADE ON DELETE CASCADE,
      ADD CONSTRAINT fk_element_ref FOREIGN KEY (element_id_ref) REFERENCES ELEMENT(element_id) ON UPDATE CASCADE ON DELETE CASCADE;`;
  } catch( e ) {
    console.log('Error generating foreign keys', e);
    throw new Error( e );
  }

  return;
}

async function seedTables( client ) {
  await seedUsers( client );
  await seedResume( client );
  await seedSection( client );

  await seedMedia( client );
  await seedSocialMedia( client );
  await seedSocialMediaUser( client );
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
          INSERT INTO USERS ( 
            user_id,
            username,
            firstname,
            lastname,
            email,
            password
          )
          VALUES ( 
            ${user.user_id}, 
            ${user.username}, 
            ${user.firstname}, 
            ${user.lastname}, 
            ${user.email}, 
            ${hashedPassword} 
          )
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
          INSERT INTO SECTION ( 
            section_id, 
            name, 
            public, 
            ishome,
            css,
            
            resume_id )
          VALUES ( 
            ${section.section_id}, 
            ${section.name},
            ${section.public}, 
            ${section.ishome},
            ${section.css},

            ${section.resume_id}
          )
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

async function seedMedia( client ) {
  try {
      /*const insertedMedias = await Promise.all(
        
          MEDIA.map( async ( media ) => {

          return client.sql`
          INSERT INTO MEDIA ( media_id, filename, position, section_id )
          VALUES ( ${media.media_id}, ${media.filename}, ${media.position}, ${media.section_id} )
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