import profile from "../assets/profile.png";
import logo from "../assets/logo.png";

const clients = [
    {id:1, logo:profile, name:'Ahmed', phone_number:73498683, email:'test@test.com', wallet:100,  type:'cooperate', isActive:true, isVat:1,
    commercialRegister: 98235764, TaxCard:98475845, banks:[{id:1, name:'CIB', isActive:"active", account_number:48573487},{id:2, name: 'HSBC', isActive:"active", account_number:48573487},{id:3, name: 'Bank Masr', isActive:"active", account_number:48573487}], attachments:[{id:1, attachment_path:profile}, {id:2, attachment_path:logo}], client_persons: [
        {
            id: 1,
            name: "abozaid",
            title: "backend",
            phone: 8,
            email: "az@gmail.com",
            created_at: "2022-06-09 08:55:04",
            updated_at: "2022-06-09 08:55:04"
        },
        {
            id: 2,
            name: "Menna",
            title: "backend",
            phone: 8,
            email: "az@gmail.com",
            created_at: "2022-06-09 08:55:04",
            updated_at: "2022-06-09 08:55:04"
        },
        {
            id: 3,
            name: "Maha",
            title: "backend",
            phone: 8,
            email: "az@gmail.com",
            created_at: "2022-06-09 08:55:04",
            updated_at: "2022-06-09 08:55:04"
        },
    ],},

    {id:2, logo:profile, name:'Mohamed', phone_number:73498683, email:'test1@test.com',wallet:100, type:'cooperate', isActive:false,isVat:1,
    commercialRegister: 98235764, TaxCard:98475845, banks:[{id:1, name:'CIB', isActive:"active", account_number:48573487},{id:2, name: 'HSBC', isActive:"active", account_number:48573487},{id:3, name: 'Bank Masr', isActive:"active", account_number:48573487}], attachments:[{id:1,name:'profile', path:profile}, {id:2, name:'logo', path:logo}] ,
    attachments:[{id:1, attachment_path:profile}, {id:2, name:'logo', attachment_path:logo}], client_persons: [
        {
            id: 1,
            name: "abozaid",
            title: "backend",
            phone: 8,
            email: "az@gmail.com",
            created_at: "2022-06-09 08:55:04",
            updated_at: "2022-06-09 08:55:04"
        },
        {
            id: 2,
            name: "Menna",
            title: "backend",
            phone: 8,
            email: "az@gmail.com",
            created_at: "2022-06-09 08:55:04",
            updated_at: "2022-06-09 08:55:04"
        },
        {
            id: 3,
            name: "Maha",
            title: "backend",
            phone: 8,
            email: "az@gmail.com",
            created_at: "2022-06-09 08:55:04",
            updated_at: "2022-06-09 08:55:04"
        },
    ],},

    {id:3, logo:profile, name:'Maha', phone_number:73498683, email:'test@test.com',wallet:100,type:'cooperate', isActive:false,isVat:1,
    commercialRegister: 98235764, TaxCard:98475845, banks:[{id:1, name:'CIB', isActive:"active", account_number:48573487},{id:2, name: 'HSBC', isActive:"active", account_number:48573487},{id:3, name: 'Bank Masr', isActive:"active", account_number:48573487}], attachments:[{id:1, attachment_path:profile}, {id:2, attachment_path:logo}], client_persons: [
        {
            id: 1,
            name: "abozaid",
            title: "backend",
            phone: 8,
            email: "az@gmail.com",
            created_at: "2022-06-09 08:55:04",
            updated_at: "2022-06-09 08:55:04"
        },
        {
            id: 2,
            name: "Menna",
            title: "backend",
            phone: 8,
            email: "az@gmail.com",
            created_at: "2022-06-09 08:55:04",
            updated_at: "2022-06-09 08:55:04"
        },
        {
            id: 3,
            name: "Maha",
            title: "backend",
            phone: 8,
            email: "az@gmail.com",
            created_at: "2022-06-09 08:55:04",
            updated_at: "2022-06-09 08:55:04"
        },
    ],},

    {id:4, logo:profile, name:'Menna', phone_number:73498683, email:'test4@test.com',wallet:100, type:'cooperate', isActive:true,isVat:1,
    commercialRegister: 98235764, TaxCard:98475845, banks:[{id:1, name:'CIB', isActive:"active", account_number:48573487},{id:2, name: 'HSBC', isActive:"active", account_number:48573487},{id:3, name: 'Bank Masr', isActive:"active", account_number:48573487}], attachments:[{id:1, attachment_path:profile}, {id:2,attachment_path:logo}], client_persons: [
        {
            id: 1,
            name: "abozaid",
            title: "backend",
            phone: 8,
            email: "az@gmail.com",
            created_at: "2022-06-09 08:55:04",
            updated_at: "2022-06-09 08:55:04"
        },
        {
            id: 2,
            name: "Menna",
            title: "backend",
            phone: 8,
            email: "az@gmail.com",
            created_at: "2022-06-09 08:55:04",
            updated_at: "2022-06-09 08:55:04"
        },
        {
            id: 3,
            name: "Maha",
            title: "backend",
            phone: 8,
            email: "az@gmail.com",
            created_at: "2022-06-09 08:55:04",
            updated_at: "2022-06-09 08:55:04"
        },
    ],},

    {id:5, logo:profile, name:'Eman', phone_number:73498683, email:'test7@test.com',wallet:100, type:'cooperate', isActive:true,isVat:1,
    commercialRegister: 98235764, TaxCard:98475845, banks:[{id:1, name:'CIB', isActive:true, account_number:48573487},{id:2, name: 'HSBC', isActive:true, account_number:48573487},{id:3, name: 'Bank Masr', isActive:true, account_number:48573487}], attachments:[{id:1, attachment_path:profile}, {id:2, attachment_path:logo}], client_persons: [
        {
            id: 1,
            name: "abozaid",
            title: "backend",
            phone: 8,
            email: "az@gmail.com",
            created_at: "2022-06-09 08:55:04",
            updated_at: "2022-06-09 08:55:04"
        },
        {
            id: 2,
            name: "Menna",
            title: "backend",
            phone: 8,
            email: "az@gmail.com",
            created_at: "2022-06-09 08:55:04",
            updated_at: "2022-06-09 08:55:04"
        },
        {
            id: 3,
            name: "Maha",
            title: "backend",
            phone: 8,
            email: "az@gmail.com",
            created_at: "2022-06-09 08:55:04",
            updated_at: "2022-06-09 08:55:04"
        },
    ],}
]

export default clients;
