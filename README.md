[Cozy][cozy] Orchestra Konnector
=======================================

What's Cozy?
------------

![Cozy Logo](https://cdn.rawgit.com/cozy/cozy-guidelines/master/templates/cozy_logo_small.svg)

[Cozy] is a personal data platform that brings all your web services in the same private space. With it, your webapps and your devices can share data easily, providing you with a new experience. You can install Cozy on your own hardware where no one's tracking you.

What is this konnector about?
------------------------------

This konnector retrieves your rent receipts from the [Orchestra platform](http://www.egiweb.net) if your landlord/real-estate agency uses this online solution.

### Open a Pull-Request

If you want to work on this konnector and submit code modifications, feel free to open pull-requests!
</br>See :
* the [contributing guide][contribute] for more information about how to properly open pull-requests.
* the [konnectors development guide](https://docs.cozy.io/en/dev/konnector/)

### Run and test

Create a `konnector-dev-config.json` file at the root with your test credentials :

```javascript
{
  "COZY_URL": "http://cozy.tools:8080",
  "fields": {"login":"zuck.m@rk.fb", "password":"123456"}
}
```
Then :

```sh
yarn
yarn standalone
```
For running the konnector connected to a Cozy server and more details see [konnectors documentation](https://docs.cozy.io/en/dev/konnector/)

### Cozy-konnector-libs

This connector uses [cozy-konnector-libs](https://github.com/cozy/cozy-konnector-libs). It brings a bunch of helpers to interact with the Cozy server and to fetch data from an online service.

### Maintainer

The lead maintainer for this konnector is [@dhayab][dhayab].


### Get in touch

You can reach the Cozy Community by:

- [konnectors documentation](https://docs.cozy.io/en/dev/konnector/)
- Chatting with us on IRC [#cozycloud on Freenode][freenode]
- Posting on our [Forum]
- Posting issues on the [Github repos][github]
- Say Hi! on [Twitter]


License
-------

Orchestra Konnector is developed by [@dhayab][dhayab] and distributed under the [MIT license][mit].

[cozy]: https://cozy.io "Cozy Cloud"
[mit]: https://opensource.org/licenses/MIT
[freenode]: http://webchat.freenode.net/?randomnick=1&channels=%23cozycloud&uio=d4
[forum]: https://forum.cozy.io/
[github]: https://github.com/cozy/
[nodejs]: https://nodejs.org/
[standard]: https://standardjs.com
[twitter]: https://twitter.com/mycozycloud
[webpack]: https://webpack.js.org
[yarn]: https://yarnpkg.com
[travis]: https://travis-ci.org
[contribute]: CONTRIBUTING.md
[dhayab]: https://github.com/dhayab
