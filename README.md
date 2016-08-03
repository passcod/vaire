# Vairë

[![Version on npm](https://img.shields.io/npm/v/vaire.svg?style=flat-square)](https://www.npmjs.com/package/vaire)
[![Travis](https://img.shields.io/travis/passcod/vaire.svg?style=flat-square)](https://travis-ci.org/passcod/vaire)
[![GitHub license](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)](https://spdx.org/licenses/ISC.html)
[![Code of Conduct](https://img.shields.io/badge/contributor-covenant-123456.svg?style=flat-square)](http://contributor-covenant.org/version/1/3/0/)

React component that takes care of the details of displaying a time that updates
live according to some function, by default a "Twitter-style" short style like
`45s`, `3m`, `8h`, `24d`, `122d`, and `2555d` for 45 seconds, 3 minutes, 8 hours,
24 days, 4 months, and 7 years respectively.

The name is from [Vairë](https://en.wikipedia.org/wiki/Vala_(Middle-earth)#Vair.C3.AB),
the Vala who weaves the story of the world, according to Tolkien's legendarium.

## Usage

``` jsx
import React, { Component } from 'react'
import Time from 'vaire'

class Foo extends Component {
  render () {
    return <div>
      This component was rendered <Time dateTime={new Date()} /> ago
    </div>
  }
}
```

This will render to something like:

```
This component was rendered 1s ago
```

and will soon update to:

```
This component was rendered 2s ago
```

et cetera. A minute later, it will be:

```
This component was rendered 1m ago
```

ad infinitum.

### Specifying the time rendering function

``` jsx
import React, { Component } from 'react'
import Time from 'vaire'

class Foo extends Component {
  renderTime (date, now = new Date()) {
    if (!(date instanceof Date)) {
      date = new Date(date)
    }

    return date.getSeconds()
  }

  render () {
    return <div>
      This component was rendered
      <Time dateTime={new Date()} format={this.renderTime} /> ago
    </div>
  }
}
```

Note that the format function will be called every second, so making it fast
won't hurt.

## API

The `dateTime` prop is required, all others are optional.

``` jsx
<Time dateTime={/* instanceof Date */}
      format={/* function (date, now = new Date()), default: shortAgo */}
      interval={/* Number, default: 1000 */}
      raw={/* true to omit the <time> wrapper */} />
```

The `shortAgo` function is described above. It can be `import`ed for direct use
or remixing, too:

``` js
import { shortAgo } from 'vaire'
```

