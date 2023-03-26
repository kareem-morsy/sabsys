const baseUrl = `https://reservation-system.sabeelan.com/reservation-system/api`;

export const userLogin = async (info, loginObj) => {
    const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginObj)
    })
    const data = await response.json();
    console.log("Data.Service.Login", data)
    sessionStorage.setItem("token", data?.data?.data?.token)

};

// async function getData(info, lang) {
//     const response = await fetch(`${baseUrl}/${lang}/${info}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//             Accept: "application/json",
//         },
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
//     return fetch(`${baseUrl}/${lang}/${info}`);
// }