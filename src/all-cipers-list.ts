export class Cipher {
    Name: string;
    IANA: string;
    MinimumProtocol: string;
    SecurityRecommendation: string;
    CipherSuite: string;

    constructor(Name: string, MinimumProtocol: string, SecurityRecommendation: string, CipherSuite: string, IANA: string) {
        this.Name = Name;
        this.IANA = IANA;
        this. MinimumProtocol = MinimumProtocol;
        this.SecurityRecommendation = SecurityRecommendation;
        this.CipherSuite = CipherSuite;
    }
}

export const allCiphers = [
    new Cipher("ECDHE-RSA-CHACHA20-POLY1305", "TLS 1.2", "Modern", "[0xcca8]","TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256"),
    new Cipher("ECDHE-ECDSA-AES128-SHA256", "TLS 1.2", "Compatible", "[0xc023]", "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256"),
    new Cipher("ECDHE-ECDSA-AES128-SHA", "TLS 1.0", "Legacy", "[0xc009]", "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA" ),
    new Cipher("ECDHE-RSA-AES128-SHA256", "TLS 1.2", "Compatible", "[0xc027]", "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256" ),
    new Cipher("ECDHE-RSA-AES128-SHA", "TLS 1.0", "Modern", "[0xc013]", "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA" ),
    new Cipher("AES128-GCM-SHA256", "TLS 1.2", "Legacy", "[0x9c]", "TLS_RSA_WITH_AES_128_GCM_SHA256" ),
    new Cipher("AES128-SHA256", "TLS 1.2", "Legacy", "[0x3c]", "TLS_RSA_WITH_AES_128_CBC_SHA256"),
    new Cipher("AES128-SHA", "TLS 1.0", "Legacy", "[0x2f]", "TLS_RSA_WITH_AES_128_CBC_SHA"),
    new Cipher("ECDHE-ECDSA-AES256-GCM-SHA384", "TLS 1.2", "Modern", "[0xc02c]", "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384" ),
    new Cipher("ECDHE-ECDSA-AES256-SHA384", "TLS 1.2", "Compatible", "[0xc024]", "TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384" ),
    new Cipher("ECDHE-RSA-AES256-GCM-SHA384", "TLS 1.2", "Modern", "[0xc030]", "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384" ),
    new Cipher("ECDHE-RSA-AES256-SHA384", "TLS 1.2", "Compatible", "[0xc028]", "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384" ),
    new Cipher("ECDHE-RSA-AES256-SHA", "TLS 1.0", "Legacy", "[0xc014]", "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA" ),
    new Cipher("AES256-GCM-SHA384", "TLS 1.2", "Legacy", "[0x9d]", "TLS_RSA_WITH_AES_256_GCM_SHA384" ),
    new Cipher("AES256-SHA256", "TLS 1.2", "Legacy", "[0x3d]", "TLS_RSA_WITH_AES_256_CBC_SHA256"),
    new Cipher("AES256-SHA", "TLS 1.0", "Legacy", "[0x35]", "TLS_RSA_WITH_AES_256_CBC_SHA"),
    new Cipher("DES-CBC3-SHA", "TLS 1.0", "Legacy", "[0x0701c0]", "SSL_CK_DES_192_EDE3_CBC_WITH_SHA")
]

export const testHostname:any = {
    EligibleHostnames: {"magichat.uk.net": true, "chadmagus.com": true, "www.absurdlonghostnamefromtheukthatwillkeepongoinguntilisaystophaha.uk.net": true},
    AllCiphers: allCiphers,
    EnabledCiphers: {
        "AES128-GCM-SHA256": true,
        "AES128-SHA": true,
        "AES128-SHA256": false,
        "AES256-GCM-SHA384": false,
        "AES256-SHA": true,
        "AES256-SHA256": true,
        "DES-CBC3-SHA": true,
        "ECDHE-ECDSA-AES128-GCM-SHA256": false,
        "ECDHE-ECDSA-AES128-SHA": false,
        "ECDHE-ECDSA-AES128-SHA256": false,
        "ECDHE-ECDSA-AES256-GCM-SHA384": true,
        "ECDHE-ECDSA-AES256-SHA384": true,
        "ECDHE-ECDSA-CHACHA20-POLY1305": true,
        "ECDHE-RSA-AES128-GCM-SHA256": true,
        "ECDHE-RSA-AES128-SHA": true,
        "ECDHE-RSA-AES128-SHA256": false,
        "ECDHE-RSA-AES256-GCM-SHA384": true,
        "ECDHE-RSA-AES256-SHA": true,
        "ECDHE-RSA-AES256-SHA384": true,
        "ECDHE-RSA-CHACHA20-POLY1305": true
    },
    EnforcedCiphers: [
        { Name: "ECDHE-RSA-CHACHA20-POLY1305", MinimumProtocol: "TLS 1.2", SecurityRecommendation:"Modern", CipherSuite: "[0xcca8]", IANA: "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256" },
        { Name: "ECDHE-RSA-AES128-SHA", MinimumProtocol: "TLS 1.0", SecurityRecommendation:"Modern", CipherSuite:"[0xc013]", IANA: "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA" },
        { Name:"ECDHE-RSA-AES256-SHA384", MinimumProtocol: "TLS 1.2", SecurityRecommendation:"Compatible", CipherSuite: "[0xc028]", IANA:"TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384" }
    ]
}

// private static AllCiphers<Cipher> = new()
// {
//     new Cipher(){ Name = "ECDHE-RSA-CHACHA20-POLY1305", MinimumProtocol = "TLS 1.2", SecurityRecommendation="Modern", CipherSuite = "[0xcca8]", IANA = "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256" },
//     new Cipher(){ Name = "ECDHE-ECDSA-AES128-SHA256", MinimumProtocol = "TLS 1.2", SecurityRecommendation="Compatible", CipherSuite = "[0xc023]", IANA = "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256" },
//     new Cipher(){ Name = "ECDHE-ECDSA-AES128-SHA", MinimumProtocol = "TLS 1.0", SecurityRecommendation="Legacy", CipherSuite = "[0xc009]", IANA = "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA" },
//     new Cipher(){ Name = "ECDHE-RSA-AES128-SHA256", MinimumProtocol = "TLS 1.2", SecurityRecommendation="Compatible", CipherSuite = "[0xc027]", IANA = "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256" },
//     new Cipher(){ Name = "ECDHE-RSA-AES128-SHA", MinimumProtocol = "TLS 1.0", SecurityRecommendation="Modern", CipherSuite = "[0xc013]", IANA = "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA" },
//     new Cipher(){ Name = "AES128-GCM-SHA256", MinimumProtocol = "TLS 1.2", SecurityRecommendation="Legacy", CipherSuite = "[0x9c]", IANA = "TLS_RSA_WITH_AES_128_GCM_SHA256" },
//     new Cipher(){ Name = "AES128-SHA256", MinimumProtocol = "TLS 1.2", SecurityRecommendation="Legacy", CipherSuite = "[0x3c]", IANA = "TLS_RSA_WITH_AES_128_CBC_SHA256" },
//     new Cipher(){ Name = "AES128-SHA", MinimumProtocol = "TLS 1.0", SecurityRecommendation="Legacy", CipherSuite = "[0x2f]", IANA = "TLS_RSA_WITH_AES_128_CBC_SHA" },
//     new Cipher(){ Name = "ECDHE-ECDSA-AES256-GCM-SHA384", MinimumProtocol = "TLS 1.2", SecurityRecommendation="Modern", CipherSuite = "[0xc02c]", IANA = "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384" },
//     new Cipher(){ Name = "ECDHE-ECDSA-AES256-SHA384", MinimumProtocol = "TLS 1.2", SecurityRecommendation="Compatible", CipherSuite = "[0xc024]", IANA = "TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384" },
//     new Cipher(){ Name = "ECDHE-RSA-AES256-GCM-SHA384", MinimumProtocol = "TLS 1.2", SecurityRecommendation="Modern", CipherSuite = "[0xc030]", IANA = "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384" },
//     new Cipher(){ Name = "ECDHE-RSA-AES256-SHA384", MinimumProtocol = "TLS 1.2", SecurityRecommendation="Compatible", CipherSuite = "[0xc028]", IANA = "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384" },
//     new Cipher(){ Name = "ECDHE-RSA-AES256-SHA", MinimumProtocol = "TLS 1.0", SecurityRecommendation="Legacy", CipherSuite = "[0xc014]", IANA = "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA" },
//     new Cipher(){ Name = "AES256-GCM-SHA384", MinimumProtocol = "TLS 1.2", SecurityRecommendation="Legacy", CipherSuite = "[0x9d]", IANA = "TLS_RSA_WITH_AES_256_GCM_SHA384" },
//     new Cipher(){ Name = "AES256-SHA256", MinimumProtocol = "TLS 1.2", SecurityRecommendation="Legacy", CipherSuite = "[0x3d]", IANA = "TLS_RSA_WITH_AES_256_CBC_SHA256" },
//     new Cipher(){ Name = "AES256-SHA", MinimumProtocol = "TLS 1.0", SecurityRecommendation="Legacy", CipherSuite = "[0x35]", IANA = "TLS_RSA_WITH_AES_256_CBC_SHA" },
//     new Cipher(){ Name = "DES-CBC3-SHA", MinimumProtocol = "TLS 1.0", SecurityRecommendation="Legacy", CipherSuite = "[0x0701c0]", IANA = "SSL_CK_DES_192_EDE3_CBC_WITH_SHA" }
// };


// <ul>
// ${this.hostnameArray.map((hostname: string) => {
//   if (this.hostnameWithCipherInfo.EligibleHostnames[hostname]) {
//     return html`<li>${hostname}</li>`;
//   }
//   if (!this.hostnameWithCipherInfo.EligibleHostnames[hostname]) {
//     return html`<li><s>${hostname}</s></li>`;
//   }
// })}
// </ul>
