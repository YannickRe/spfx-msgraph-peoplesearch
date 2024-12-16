# Microsoft Graph People Search Web Part

## Summary

Show and search users from your organisation, through Microsoft Graph. Search results show as a nice People Card, and display the Live Persona Card on hover.  
The web part can be configured with a static search query, show a search box or accept a search query through a Dynamic Data connection to further filter the displayed results. Dynamic data can by default come from the Microsoft Search search box or the Page Environment. You could also use the Search Box Web Part provided by the [PnP Modern Search Web Parts](https://microsoft-search.github.io/pnp-modern-search/).

![directory](/assets/MicrosoftGraphPeopleSearch.gif)

As a code sample this clarifies the following concepts:

- Connecting to Microsoft Graph using a SharePoint Framework web part
- Implement efficient paging through large collections in Microsoft Graph
- Use of $select, $filter, $orderby, $count and $search query parameters for Microsoft Graph
- Implement batch requests to Microsoft Graph for fetching multiple resources in one network request

## More information

I wrote a blog post covering more if the inner workings, you can find it at [SPFx People Search web part based on Microsoft Graph](https://blog.yannickreekmans.be/spfx-people-search-web-part-based-on-microsoft-graph/).  
Additionally, this web part has also been demoed on the [PnP Community call of September 10th, 2020](https://youtu.be/vxwzNCWIAWY?t=1342).

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.12.1-green.svg)

## Applies to

- [SharePoint Online](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Microsoft Teams](https://products.office.com/en-US/microsoft-teams/group-chat-software) - Untested!!
- [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

Either download [the latest release](https://github.com/YannickRe/spfx-msgraph-peoplesearch/releases/latest) OR build it yourself:

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`

Install the package:

- Add to AppCatalog and deploy
- Assign 'User.Read.All' delegated permissions to the 'SharePoint Online Client Extensibility Web Application Principal', with [CLI for Microsoft 365](https://pnp.github.io/cli-microsoft365/) or [PnP PowerShell](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/grant-pnptenantserviceprincipalpermission?view=sharepoint-ps)

### CLI for Microsoft 365

```
m365 login
m365 spo serviceprincipal grant add --resource 'Microsoft Graph' --scope 'User.Read.All'
```

### PnP PowerShell

```
Grant-PnPTenantServicePrincipalPermission -Scope "User.Read.All" -Resource "Microsoft Graph"
```

---

## Acknowledgements / Inspiration

There are many web parts that aim to do the same thing, but they either use SharePoint Search as data store or they render their results in a completely different way. It's impossible to acknowledge all sources of inspiration to this solution, but I do want to give a shout out to two projects (and their contributors) that were foundational to deliver this solution as quickly as I did:

### React Directory Web Part

The foundation on which I started building my own solution. This web part can be downloaded from the [SharePoint Framework Client-Side Web Part Samples & Tutorial Materials](https://github.com/pnp/sp-dev-fx-webparts/tree/master/samples/react-directory)

#### Thanks to

- João Mendes ([@joaojmendes](https://twitter.com/joaojmendes))
- Peter Paul Kirschner ([@petkir_at](https://twitter.com/petkir_at))

### PnP Modern Search Web Parts

These web parts were an enormous inspiration on code structure and implementation approach. Their codebase is very impressive, and a lot of the code in this web part is a literal copy paste from them. You can find more on the [PnP Modern Search Web Parts](https://microsoft-search.github.io/pnp-modern-search/) page.

#### Thanks to

- Franck Cornu (aequos) - [@FranckCornu](http://www.twitter.com/FranckCornu) - [GitHub Sponsor Page](https://github.com/sponsors/FranckyC)
- Mikael Svenson (Microsoft) - [@mikaelsvenson](http://www.twitter.com/mikaelsvenson)
- Yannick Reekmans - [@yannickreekmans](https://twitter.com/yannickreekmans)
- Albert-Jan Schot - [@appieschot](https://twitter.com/appieschot)
- Tarald Gåsbakk (PuzzlePart) - [@taraldgasbakk](https://twitter.com/Taraldgasbakk)
- Brad Schlintz (Microsoft) - [@bschlintz](https://twitter.com/bschlintz)
- Richard Gigan - [@PooLP](https://twitter.com/PooLP)
