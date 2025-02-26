const USERS = [
    {
        user_id:'11111111-1111-1111-1111-111111111111',
        username: 'AndoniAT',
        firstname: 'Andoni',
        lastname: 'Alonso Tort',
        email: 'example@example.com',
        password: 'User123?',
        showheader: true,
        url_hero: null,
        url_profile: null
    },
    {
        user_id:'11111111-1111-1111-1111-111111111555',
        username: 'User',
        firstname: 'user',
        lastname: 'example',
        email: 'user@example.com',
        password: 'User123?',
        showheader: false,
        url_hero: null,
        url_profile: null
    },
];

const RESUME = [
    {
        resume_id:'11111111-1111-1111-1111-111111111112',
        created:'2024-03-23T17:13:57.508Z',
        user_id:'11111111-1111-1111-1111-111111111111'
    },
    {
        resume_id:'11111111-1111-1111-1111-111111111113',
        created:'2024-03-28T17:13:57.508Z',
        user_id:'11111111-1111-1111-1111-111111111555'
    }
];

const SECTION = [
    /*{
        section_id:'11111111-1111-1111-1111-111111111113',
        name: 'My Projects',
        created: '2024-03-23T17:15:57.508Z',
        public: true,
        type:'Projects',
        style:1,
        backgroundColor:'#82a3c0',

        resume_id:'11111111-1111-1111-1111-111111111112',
    },
    {
        section_id:'11111111-1111-1111-1111-111111111114',
        name: 'My Gallery',
        created: '2024-03-23T17:20:57.508Z',
        public: true,
        type:'Gallery',
        style:1,
        backgroundColor:'#46aee2',

        resume_id:'11111111-1111-1111-1111-111111111112',
    },
    {
        section_id:'11111111-1111-1111-1111-111111111115',
        name: 'My Custom',
        created: '2024-03-23T17:24:57.508Z',
        public: true,
        type:'Custom',
        style:1,
        backgroundColor:'#55524e',

        resume_id:'11111111-1111-1111-1111-111111111112',
    },*/
    {
        section_id:'11111111-1111-1111-1111-111111111126',
        name: 'My Home',
        created: '2024-03-23T17:15:57.508Z',
        public: true,
        ishome:true,
        css:'{"backgroundColor": "rbga(0,0,0,0)"}',

        resume_id:'11111111-1111-1111-1111-111111111112',
    },
    {
        section_id:'11111111-1111-1111-1111-111111111226',
        name: 'Home User',
        created: '2024-03-28T17:15:57.508Z',
        public: true,
        ishome:true,
        css:'{"backgroundColor": "rbga(0,0,0,0)"}',

        resume_id:'11111111-1111-1111-1111-111111111113',
    },
];

const MEDIA = [
    /*{
        media_id:'11111111-1111-1111-1111-111111111118',
        filename:'project1.png',
        position:1,

        section_id:'11111111-1111-1111-1111-111111111113',
        project_id:'11111111-1111-1111-1111-111111111117'
    }*/
]

const SOCIAL_MEDIA = [
    {
        social_id:'11111111-1111-1111-1111-111111111119',
        name:'youtube',
        icon:'youtube.png'
    },
    {
        social_id:'11111111-1111-1111-1111-111111111121',
        name:'twitter',
        icon:'twitter.png'
    },
    {
        social_id:'11111111-1111-1111-1111-111111111122',
        name:'facebook',
        icon:'facebook.png'
    },
    {
        social_id:'11111111-1111-1111-1111-111111111123',
        name:'instagram',
        icon:'instagram.png'
    },
    {
        social_id:'11111111-1111-1111-1111-111111111124',
        name:'linkedin',
        icon:'linkedin.png'
    },
    {
        social_id:'11111111-1111-1111-1111-111111111125',
        name:'github',
        icon:'github.png'
    },
];

module.exports = {
    USERS,
    RESUME,
    SECTION,
    MEDIA,
    SOCIAL_MEDIA
  };
  