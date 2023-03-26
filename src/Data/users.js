
import profile from '../assets/profile.png'

const users = [
    {id:1, image:profile, name:'Ahmed', phone:73498683, email:'test1@test.com', department:'Marketing',wallet:1000, role:'agent', permissions:['create reservation'], password:'pass'},
    {id:2, image:profile, name:'Mohamed', phone:73498683, email:'test2@test.com', department:'Marketing',wallet:300,
    role:'admin', permissions:['create reservation','edit','delete'], password:'pass'},
    {id:3, image:profile, name:'Maha', phone:73498683, email:'test3@test.com', department:'HR',wallet:5000, role:'admin', permissions:['create reservation','edit','delete'], password:'pass'},
    {id:4, image:profile, name:'Menna', phone:73498683, email:'dev@egicons.com', department:'HR',wallet:1000, role:'super admin', permissions:['create reservation','edit','delete', 'create user'], password:'password'},
    {id:5, image:profile, name:'Eman', phone:73498683, email:'test5@test.com', department:'Accounting',wallet:900, role:'agent', permissions:['create reservation'], password:'pass'}
]

export default users;