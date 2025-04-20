import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { Cipher, allCiphers } from "./all-cipers-list";
import '@umbraco-ui/uui';

type HostNameWithCipherInfo = {
  EligibleHostnames: Record<string, Boolean>;
  AllCiphers: Cipher[];
  EnabledCiphers: Record<string, Boolean>;
  EnforcedCiphers: any[];
};


@customElement('my-element')
export class MyElement extends LitElement {

  @property({ type: String })
  baseApiUrl = "backoffice/ManageCloudCiphers/Dashboard/";

  @property({ type: String })
  hostnames: string = "magichat.uk chadmagus.com";

  @property({ type: Array })
  hostnameArray: string[] = [];

  @property({ type: Object })
  hostnameWithCipherInfo: HostNameWithCipherInfo = {
    EligibleHostnames: {},
    AllCiphers: [],
    EnabledCiphers: {},
    EnforcedCiphers: [],
  };

  @property({ type: Boolean })
  patchingCiphers: boolean = false;

  @property({ type: String })
  ciphersToDisable: string = "";

  @property()
  cipherPropertiesMapping: { [key: string]: string[] } = {};

  @state()
  isLoading: boolean = false;

  handleHostnames = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.hostnames = input.value;
  };

  isValidHostname(host: string): boolean {
    const hostnameRegex = /^(?=.{1,253}$)(?!-)[A-Za-z0-9-]{1,63}(?<!-)(?:\.(?!-)[A-Za-z0-9-]{1,63}(?<!-))*$/;
    return hostnameRegex.test(host);
  }

  loadCiphers = async () => {
    this.isLoading = true;
    // Split hostnames into an array. Regex matches any single character that is either a comma (,), a newline character (\n), a space (' '), a double quote ("), or a single quote (').
    const hostnameArray = this.hostnames
      .split(/[,\n "'"]/)
      .filter((entry) => entry.trim() != "");

    if (
      hostnameArray.length > 0 &&
      confirm("Are you sure you want to load ciphers for\n" + hostnameArray.join("\n") +" ?")) {
      try {
        //Mock request. Doesn't do anything relevant yet.
        const response = await fetch(`${this.baseApiUrl}LoadCiphers?customHostnames=${hostnameArray.join("&customHostnames=")}`);
        //Make sure to clear ciphers to avoid duplicate
        this.clearCiphers();
        if (response) {
          this.hostnameArray = hostnameArray;
          // Declare this here to be able to add each valid hostname to EligibleHostnames further down
          const eligibleHostnames = {} as Record<string, boolean>
          //Build array of objects
          this.hostnameArray.forEach(hostname => {
            if(this.isValidHostname(hostname)) {
              eligibleHostnames[hostname] = true
            } else {
              eligibleHostnames[hostname] = false
            }
            if(localStorage.getItem(`${hostname}`) !== null) {
              // If the hostname is present, load enabled/disabled ciphers
              const hostnameDetails = JSON.parse(localStorage.getItem(`${hostname}`))
              const test = {
                EligibleHostnames: eligibleHostnames,
                AllCiphers: allCiphers,
                EnabledCiphers: hostnameDetails,
                EnforcedCiphers: [
                  { Name: "ECDHE-RSA-CHACHA20-POLY1305", MinimumProtocol: "TLS 1.2", SecurityRecommendation:"Modern", CipherSuite: "[0xcca8]", IANA: "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256" },
                  { Name: "ECDHE-RSA-AES128-SHA", MinimumProtocol: "TLS 1.0", SecurityRecommendation:"Modern", CipherSuite:"[0xc013]", IANA: "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA" },
                  { Name:"ECDHE-RSA-AES256-SHA384", MinimumProtocol: "TLS 1.2", SecurityRecommendation:"Compatible", CipherSuite: "[0xc028]", IANA:"TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384" }
                ]
              }

              this.hostnameWithCipherInfo = test
            } else {
              const obj: HostNameWithCipherInfo  = {
                EligibleHostnames: eligibleHostnames as Record<string, boolean>,
                AllCiphers: allCiphers,
                EnabledCiphers: {        "AES128-GCM-SHA256": true,
                  "AES128-SHA": true,
                  "AES128-SHA256": true,
                  "AES256-GCM-SHA384": true,
                  "AES256-SHA": true,
                  "AES256-SHA256": true,
                  "DES-CBC3-SHA": true,
                  "ECDHE-ECDSA-AES128-GCM-SHA256": true,
                  "ECDHE-ECDSA-AES128-SHA": true,
                  "ECDHE-ECDSA-AES128-SHA256": true,
                  "ECDHE-ECDSA-AES256-GCM-SHA384": true,
                  "ECDHE-ECDSA-AES256-SHA384": true,
                  "ECDHE-ECDSA-CHACHA20-POLY1305": true,
                  "ECDHE-RSA-AES128-GCM-SHA256": true,
                  "ECDHE-RSA-AES128-SHA": true,
                  "ECDHE-RSA-AES128-SHA256": true,
                  "ECDHE-RSA-AES256-GCM-SHA384": true,
                  "ECDHE-RSA-AES256-SHA": true,
                  "ECDHE-RSA-AES256-SHA384": true,
                  "ECDHE-RSA-CHACHA20-POLY1305": true},
                EnforcedCiphers: [
                  { Name: "ECDHE-RSA-CHACHA20-POLY1305", MinimumProtocol: "TLS 1.2", SecurityRecommendation:"Modern", CipherSuite: "[0xcca8]", IANA: "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256" },
                  { Name: "ECDHE-RSA-AES128-SHA", MinimumProtocol: "TLS 1.0", SecurityRecommendation:"Modern", CipherSuite:"[0xc013]", IANA: "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA" },
                  { Name:"ECDHE-RSA-AES256-SHA384", MinimumProtocol: "TLS 1.2", SecurityRecommendation:"Compatible", CipherSuite: "[0xc028]", IANA:"TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384" }
                ]
              }
              this.hostnameWithCipherInfo = obj;
              // Create an array of propertymappings that allows users to disable ciphers based on Cipher properties mentioned in the comments below:
              this.propertyMapping()
            }
          })
          // Mock response
        }
        this.isLoading = false;

        // TODO: Need to make a check if the hostname already exists or has ciphers changed
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    } else {
      this.isLoading = false;
      this.clearCiphers();
    }
  };

  propertyMapping = ():void => {
    this.hostnameWithCipherInfo.AllCiphers.forEach(
      (cipherInfo: Cipher) => {
        // Minimum Protocol
        let minimumProtocol = cipherInfo.MinimumProtocol.split(" ")[1];
        if (this.cipherPropertiesMapping[minimumProtocol]) {
          this.cipherPropertiesMapping[minimumProtocol].push(
            cipherInfo.Name
          );
        } else {
          this.cipherPropertiesMapping[minimumProtocol] = [
            cipherInfo.Name,
          ];
        }
        // Security Recommendation
        let securityRecommendation =
          cipherInfo.SecurityRecommendation.toLowerCase();
        if (this.cipherPropertiesMapping[securityRecommendation]) {
          this.cipherPropertiesMapping[securityRecommendation].push(
            cipherInfo.Name
          );
        } else {
          this.cipherPropertiesMapping[securityRecommendation] = [
            cipherInfo.Name,
          ];
        }
        // Ciphersuite Name
        if (this.cipherPropertiesMapping[cipherInfo.CipherSuite]) {
          this.cipherPropertiesMapping[cipherInfo.CipherSuite].push(
            cipherInfo.Name
          );
        } else {
          this.cipherPropertiesMapping[cipherInfo.CipherSuite] = [
            cipherInfo.Name,
          ];
        }
        // IANA
        let iana = cipherInfo.IANA.toLowerCase();
        if (this.cipherPropertiesMapping[iana]) {
          this.cipherPropertiesMapping[iana].push(cipherInfo.Name);
        } else {
          this.cipherPropertiesMapping[iana] = [cipherInfo.Name];
        }
      }
    );
  }

  noCiphers = (): boolean => {
    return !this.hostnameWithCipherInfo.AllCiphers.length;
  };

  clearCiphers = (): void => {
    this.hostnameWithCipherInfo = {
      EligibleHostnames: {},
      AllCiphers: [],
      EnabledCiphers: {},
      EnforcedCiphers: [],
    };
  };

  ciphersSelected = (): void => {
    this.patchingCiphers = true;
    let atLeastOneSelected = false;
    let atLeastOneDisabled = false;
    for (let cipherName in this.hostnameWithCipherInfo.EnabledCiphers) {
      if (
        this.hostnameWithCipherInfo.EnabledCiphers.hasOwnProperty(cipherName)
      ) {
        if (this.hostnameWithCipherInfo.EnabledCiphers[cipherName]) {
          atLeastOneSelected = true;
        } else {
          atLeastOneDisabled = true;
        }
      }
    }
    this.patchingCiphers = !(atLeastOneSelected && atLeastOneDisabled);
  };

  toggleSelection = (cipher: string) => {
    this.hostnameWithCipherInfo.EnabledCiphers[cipher] = !this.hostnameWithCipherInfo.EnabledCiphers[cipher];
    this.ciphersSelected();
  };

  patchHostnameCiphers = (): void => {
    if (this.hostnameArray.length > 0 &&
      confirm(
        "Are you sure you want to patch ciphers for\n" +
          this.hostnameArray.join("\n") +
          " ?"
      )
    ) {
      this.patchingCiphers = true;
      this.hostnameArray.forEach(hostname => {
        if(this.isValidHostname(hostname)) {
          localStorage.setItem(`${hostname}`, JSON.stringify(this.hostnameWithCipherInfo.EnabledCiphers))
        }
      })
      this.clearCiphers();
    }
  };

  selectManyCiphers = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.ciphersToDisable = input.value;
    // Split the ciphers that are input on a new line by splitting it on comma, quotes etc.
    let ciphersToDisableArray = this.ciphersToDisable
      .split(/[,\n "'"]/)
      .filter((entry) => entry.trim())
      .map((x) => x.toLowerCase());

    // If the user puts strings, which are not just Cipher names, but other cipher properties eg. Recommendation
    ciphersToDisableArray.forEach((key) => {
      if (
        this.cipherPropertiesMapping[key] &&
        this.cipherPropertiesMapping[key].length > 0
      ) {
        ciphersToDisableArray = [
          ...new Set([
            ...ciphersToDisableArray,
            ...this.cipherPropertiesMapping[key],
          ]),
        ];
      }
    });

    // Go over list of all ciphers and disable the ones that are in ciphersToDisableArray
    this.hostnameWithCipherInfo.AllCiphers.forEach((cipher: Cipher) => {
      this.hostnameWithCipherInfo.EnabledCiphers[cipher.Name] =
        ciphersToDisableArray
          .map((x) => x.toLowerCase())
          .indexOf(cipher.Name.toLowerCase()) === -1;
    });
    this.ciphersSelected();
  };

  render() {
    return html`
      <uui-box headline="Ciphers Manager">
        <div class=${this.noCiphers() === false ? "hide" : ""}>
          <label class="control-label">Hostnames</label>
          <textarea class="hostnames" .value=${this.hostnames} @change=${(e: Event) => this.handleHostnames(e)}> </textarea>
          <uui-button
            color="default"
            look="primary"
            label="load ciphers"
            @click=${() => this.loadCiphers()}
          >
            Load ciphers
          </uui-button>
        </div>

        <!-- Loadbar -->
        ${this.isLoading ? html`<uui-loader-bar></uui-loader-bar>` : html``}

        <div class="cipher-app" style=${this.noCiphers() === true ? "display: none;" : ""}>
          <div class="hostnames-table">
          <uui-table>
            <uui-table-head>
              <uui-table-head-cell>Hostname</uui-table-head-cell>
              <uui-table-head-cell class="valid-header">Valid</uui-table-head-cell>
            </uui-table-head>
            <!-- Valid -->
            ${this.hostnameArray.map((hostname) => {
              if (this.hostnameWithCipherInfo.EligibleHostnames[hostname]) {
                return html` <uui-table-row>
                  <uui-table-cell>${hostname}</uui-table-cell>
                  <uui-table-cell class="validation-status"> 
                    <uui-icon-registry-essential>
                      <uui-icon name="check"></uui-icon>
                    </uui-icon-registry-essential>
                  </uui-table-cell>
                </uui-table-row>`;
              }
              else {
                return html` <uui-table-row>
                  <uui-table-cell><s>${hostname}</s></uui-table-cell>
                  <uui-table-cell class="validation-status"> 
                    <uui-icon-registry-essential>
                      <uui-icon name="wrong"></uui-icon> 
                    </uui-icon-registry-essential>
                  </uui-table-cell>
                </uui-table-row>`;
              }
            })}
            </uui-table>
            <small><i>Hostnames marked with the x will not be modified upon saving.</i></small>
          </div>
          <fieldset>
            <legend>Choose the ciphers</legend>
            <uui-table>
              <uui-table-head>
                <uui-table-head-cell>Cipher Name</uui-table-head-cell>
                <uui-table-head-cell>Min Protocol</uui-table-head-cell>
                <uui-table-head-cell>Security Recommendation</uui-table-head-cell>
                <uui-table-head-cell>Cipher Suite</uui-table-head-cell>
                <uui-table-head-cell>IANA</uui-table-head-cell>
              </uui-table-head>

              <!-- Load all ciphers -->
              ${this.hostnameWithCipherInfo.AllCiphers.map((cipher: Cipher) => {
                return html`
                  <uui-table-row
                    class=${this.hostnameWithCipherInfo.EnabledCiphers[
                      cipher.Name
                    ]
                      ? "active"
                      : "cipher-row"}
                    @click=${() => this.toggleSelection(cipher.Name)}
                  >
                    <uui-table-cell>${cipher.Name}</uui-table-cell>
                    <uui-table-cell>${cipher.MinimumProtocol}</uui-table-cell>
                    <uui-table-cell
                      >${cipher.SecurityRecommendation}</uui-table-cell
                    >
                    <uui-table-cell>${cipher.CipherSuite}</uui-table-cell>
                    <uui-table-cell>${cipher.IANA}</uui-table-cell>
                  </uui-table-row>
                `;
              })}

              <!-- Load only ciphers that are enforced, thereby enabled-->
              ${this.hostnameWithCipherInfo.EnforcedCiphers.map(
                (cipher: Cipher) => {
                  return html`
                    <uui-table-row class="active cipher-row">
                      <uui-table-cell>${cipher.Name}</uui-table-cell>
                      <uui-table-cell>${cipher.MinimumProtocol}</uui-table-cell>
                      <uui-table-cell
                        >${cipher.SecurityRecommendation}</uui-table-cell
                      >
                      <uui-table-cell>${cipher.CipherSuite}</uui-table-cell>
                      <uui-table-cell>${cipher.IANA}</uui-table-cell>
                    </uui-table-row>
                  `;
                }
              )}
            </uui-table>
          </fieldset>

          <uui-button
            look="primary"
            color="positive"
            label="patch hostnames"
            ng-hide="model.patchingCiphers"
            @click=${() => this.patchHostnameCiphers()}
          >
            Save
          </uui-button>
          <uui-button
            look="primary"
            color="danger"
            label="cancel patch hostnames"
            ng-hide="model.patchingCiphers"
            @click=${() => this.clearCiphers()}
          >
            Cancel
          </uui-button>

          <hr class="cipher-hr"/>

          <uui-label class="cipher-input-label" for="insert-ciphers-disable"
            >Ciphers to disable</uui-label
          >
          <p class="disable-info">
            Ciphers added here will automatically get set to disabled in the
            cipher list above
          </p>
          <textarea
            @keyup=${(e: Event) => this.selectManyCiphers(e)}
            id="insert-ciphers-disable"
            .value=${this.ciphersToDisable}
          >
          </textarea>
        </div>
      </uui-box>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 20px;
      box-sizing: border-box;
      height: 100%;
      overflow-y: scroll;
      width: 100%;
      background: #f3f3f5;
      border-left: 1px solid #d8d7d9;
    }

    uui-table {
      border-collapse: collapse;
    }

    uui-icon {
      vertical-align: middle;
    }

    p,
    label {
      font: 1rem "Fira Sans", sans-serif;
    }

    .control-label {
      display: block;
      /* margin-bottom: var(--uui-size-space-3); */
      margin-bottom: 9px;
    }

    .cipher-app {
      padding-bottom: 60px;
    }

    .hostnames {
      display: block;
      /* margin-bottom: var(--uui-size-space-3); */
      margin-bottom: 9px;
      width: 350px;
      height: 70px;
    }

    .hostnames-table {
      max-width: 400px;
      border: none;
      /* margin-bottom: var(--uui-size-space-5); */
      margin-bottom: 28px;
    }

    .hostnames-table uui-table-head-cell {
      padding-left: 0;
      padding-right: 0;
      padding-top: 0;
    }

    .valid-header {
      text-align: center;
    }

    .hostnames-table uui-table-cell {
      border: 1px solid #1b264f;
      height: 100%;
    }

    .hostnames-table .validation-status {
      width: 0;
      text-align: center;
    }

    .hide {
      display: none;
    }

    fieldset {
      padding: 0px;
      margin-bottom: 12px;
    }

    table {
      border-collapse: separate;
      border-spacing: 0;
      text-align: left;
    }

    td {
      padding-top: 10px;
      padding-bottom: 10px;
      cursor: pointer;
      border-bottom: 1px solid #000;
    }

    .cipher-header {
      border-bottom: 1px solid #000;
    }

    .cipher-row {
      color: grey;
    }

    .cipher-row:hover,
    .active:hover {
      cursor: pointer;
    }

    .cipher-hr {
      /* margin: var(--uui-size-space-4) 0px; */
      margin: 12px 0px;
    }

    #insert-ciphers-disable,
    #insert-ciphers-enable {
      width: 100%;
      height: 150px;
    }

    .disable-info {
      margin-top: var(--uui-size-space-2);
    }

    .cipher-input-label {
      font-weight: bold;
      font-size: 1rem;
    }

    .active {
      background-color: #00ffb1;
      color: #000;
    }

    input {
      margin: 0.4rem;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
