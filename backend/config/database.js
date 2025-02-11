// import fs from 'fs';
// import pg from 'pg';
// import url from 'url';

// // export const config = {
// //     user: "avnadmin",
// //     password: "AVNS_o77Q-mARkmgwT00ulZa",
// //     host: "careermate-pg-database-careermate.h.aivencloud.com",
// //     port: 10472,
// //     database: "defaultdb",
// //     ssl: {
// //         rejectUnauthorized: false,
// //         ca: `-----BEGIN CERTIFICATE-----
// // MIIEQTCCAqmgAwIBAgIUOzkwnIyp7c7bVeekQpZS5kEAeewwDQYJKoZIhvcNAQEM
// // BQAwOjE4MDYGA1UEAwwvOWU0MjNkMzQtNzQ3Mi00NjBiLTk3ZDEtODM5OTlkYTc5
// // MjIzIFByb2plY3QgQ0EwHhcNMjQwOTAxMDcwMzE4WhcNMzQwODMwMDcwMzE4WjA6
// // MTgwNgYDVQQDDC85ZTQyM2QzNC03NDcyLTQ2MGItOTdkMS04Mzk5OWRhNzkyMjMg
// // UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALipYXmK
// // 4BThCp2jBGis1KP6U9VG7afl6S/CTXyWflKtlKA3BbNf02gkUiZhGn6haV3NqXQa
// // mIhuBO49URdnLlpBbh+z7VEPEh7o9v+/6E6Yi+GLMvTB87jczFchN339N3E41Oc8
// // WT7u4+kJKb8lc8UWJdCGhr+FfwvL9/2QxpC3+HCc1JZn47XKL01xiCMHVfAbo/vD
// // DYJm1bSMe3KLddUCsDaBhJ2pf2aZDsG0t2YmkngNcQRKu7mI+4pu3rQgOtH4FFLs
// // MR7UY4sStRiKa7ocf07DcBAWUcqfX1PTApbGqotyORf6kSS8xqoJDkFsPi67TrWI
// // BCwvS/rIECnrJNCK66yW3NA7zQVd8wzg1v9btipeOqFtCKuf1st6fWH1jlILi2Nk
// // 4smi7HN7sFbXktbtgd/pqJjIx/vEXIf0Y+1oYNr6X/ggUgTiTQQlKvrWIK5NVRia
// // z/+mi1szT5tyRKvY+uKB8uZbky2HpdgM/MECwVAHNcAqzngl3Mmu5h0iJQIDAQAB
// // oz8wPTAdBgNVHQ4EFgQUow8uojvbsGHARTx4etZOdUm/9PQwDwYDVR0TBAgwBgEB
// // /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAFHxFV6SYEOaY6Cv
// // q5YFzeJb2k+29gZQ0w27Dzz/YzEsKAR+05kSUl/b0h4NInZR3WshfSsNmHHVjpG5
// // KODwxpFUk10TeWmNbS9ioqejS6gSApMZhJ/lEj8o61KJBa5709aBFblXB/g8j7Ku
// // P1sED7n6q/9dQpTjKUeYDtD4gZnbENiMnZNf0AMlSqP6w6CCCtomCEcHrkf0b14Y
// // aXi/IVg+2w7j6e9f7smTAX84xGSCXsh9qZXf4+q9Qkycrt9Ko84+jx42QkCoIVMN
// // xR/eoJkQklm+0jWq1eDVxFGx8/UXtkUmjf4U/o1syX56cOeZlpTSnhxccKvQiySc
// // AbhjghZqnET+RhK44H3FlQCyg3xZveZv2h9LTug8QWDpkOgr1Ky+OC2yhgWYJ/oY
// // 7xegU/ln/jIDwpzDX8+hD/GNBFxP65bngfl/JucRbWXybZT/nhcoWr7oa/qJFXad
// // 5uAykxzlS0LHaR5PxAKT6Mtj2br/N+ZVix6VXoOakfmFaYwDhg==
// // -----END CERTIFICATE-----`,
// //     },
// // };

//  const client = new pg.Client(config);
// client.connect(function (err) {
//     if (err) 
//         throw err;
//     client.query("SELECT VERSION()", [], function (err, result) {
//         if (err)
//             throw err;

//         console.log(result.rows[0].version);
//         client.end(function (err) {
//             if (err)
//                 throw err;
//         });
//     });
// });
// export default client;