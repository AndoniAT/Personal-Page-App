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

async function seedUsers( client ) {
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
            photo VARCHAR(255)
          );
        `;
    
        console.log( `Created "USERS" table` );
    
        // Insert data into the "USERS" table
        const insertedUsers = await Promise.all(
          
            USERS.map( async ( user ) => {

            const hashedPassword = await bcrypt.hash( user.password, 10 );
            
            return client.sql`
            INSERT INTO USERS ( user_id, username, firstname, lastname, email, password, photo )
            VALUES ( ${user.user_id}, ${user.username}, ${user.firstname}, ${user.lastname}, ${user.email}, ${hashedPassword}, ${user.photo} )
            ON CONFLICT ( user_id ) DO NOTHING;
          `;
          } ),
        );
    
        console.log( `Seeded : ${insertedUsers.length} users` );
    
        return {
          createTable,
          users: insertedUsers
        };
      } catch ( error ) {
        console.error('Error seeding users:', error);
        throw error;
      }
}

async function seedResume( client ) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "USERS" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS RESUME (
            resume_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            user_id UUID REFERENCES USERS( user_id ) ON UPDATE CASCADE ON DELETE CASCADE
          );
        `;
    
        console.log( `Created "RESUME" table` );
    
        // Insert data into the "USERS" table
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
          createTable,
          resumes: insertedResumes,
        };
      } catch (error) {
        console.error( 'Error seeding resumes:', error );
        throw error;
      }
}

async function seedSection( client ) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "USERS" table if it doesn't exist
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
            resume_id UUID REFERENCES RESUME( resume_id ) ON UPDATE CASCADE ON DELETE CASCADE
          );
        `;
    
        console.log(`Created "SECTION" table`);
    
        // Insert data into the "USERS" table
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
          createTable,
          users: insertedSections,
        };
      } catch ( error ) {
        console.error( 'Error seeding sections:', error );
        throw error;
      }
}

async function seedProject( client ) {
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
    
        // Insert data into the "PROJECT" table
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
          createTable,
          users: insertedProjects,
        };
      } catch ( error ) {
        console.error( 'Error seeding projects:', error );
        throw error;
      }
}

async function seedMedia( client ) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        
        // Create the "USERS" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS MEDIA (
            media_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            filename VARCHAR(255) NOT NULL,
            position INT,
            isHero BOOLEAN DEFAULT False,

            section_id UUID REFERENCES SECTION( section_id ) ON UPDATE CASCADE ON DELETE CASCADE,
            project_id UUID REFERENCES PROJECT( project_id ) ON UPDATE CASCADE ON DELETE CASCADE
          );
        `;
    
        console.log( `Created "MEDIA" table` );
    
        // Insert data into the "PROJECT" table
        const insertedMedias = await Promise.all(
          
            MEDIA.map( async ( media ) => {

            return client.sql`
            INSERT INTO MEDIA ( media_id, filename, position, section_id, project_id )
            VALUES ( ${media.media_id}, ${media.filename}, ${media.position}, ${media.section_id}, ${media.project_id} )
            ON CONFLICT ( media_id ) DO NOTHING;
          `;
          } ),
        );
    
        console.log( `Seeded : ${insertedMedias.length} medias` );
    
        return {
          createTable,
          users: insertedMedias,
        };
      } catch ( error ) {
        console.error( 'Error seeding medias:', error );
        throw error;
      }
}

async function seedSocialMedia( client ) {
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
          createTable,
          users: insertedSocialMedias,
        };
      } catch ( error ) {
        console.error( 'Error seeding social medias:', error );
        throw error;
      }
}

async function seedSocialMediaUser( client ) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "USERS" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS SOCIAL_MEDIA_USER (
            user_id UUID REFERENCES USERS(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
            social_id UUID REFERENCES SOCIAL_MEDIA(social_id) ON UPDATE CASCADE ON DELETE CASCADE,
            link VARCHAR(255) NOT NULL,
            username VARCHAR(255),

            PRIMARY KEY (user_id, social_id)
          );
        `;
    
        console.log(`Created "SOCIAL_MEDIA" table`);
    
        return {
          createTable
        };

      } catch ( error ) {
        console.error( 'Error seeding social medias:', error );
        throw error;
      }
}

async function main() {
    const client = await db.connect();
    
    await dropTables( client );
    await seedUsers( client );
    await seedResume( client );
    await seedSection( client );

    await seedProject( client );
    await seedMedia( client );
    await seedSocialMedia( client );
    await seedSocialMediaUser( client );

    await client.end();
  }

main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
});