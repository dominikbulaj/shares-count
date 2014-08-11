var networks = [
    {
        name:  'facebook',
        url:   'http://graph.facebook.com/?ids=%url',
        parse: function (res) {
            // json decode
            var resObj = JSON.parse(res);
            for (first in resObj) break;

            return resObj[first].shares || 0;
        }
    },

    {
        name:  'twitter',
        url:   'http://urls.api.twitter.com/1/urls/count.json?url=%url',
        parse: function (res) {
            // json decode
            return JSON.parse(res).count || 0;
        }
    },

    {
        name:  'google_plus',
        url:   'https://plusone.google.com/u/0/_/+1/fastbutton?count=true&url=%url',
        parse: function (res) {
            var regex = /window\.__SSR\s*=\s*\{c:\s*(\d+)/i;
            var matches = res.match(regex);
            if (matches) {
                return parseInt(matches[1], 10);
            }
            return 0;
        }
    },

    {
        name:  'vk',
        url:   'http://vk.com/share.php?act=count&url=%url',
        parse: function (res) {
            // VK.Share.count\([^,]+,\s*(\d+)\)
            var regex = /VK\.Share\.count\([^,]+,\s*(\d+)\)/i;
            return parseInt(res.match(regex)[1], 10);
        }
    },

    {
        name:  'odnoklassniki',
        url:   'http://www.odnoklassniki.ru/dk?st.cmd=extLike&uid=odklcnt0&ref=%url',
        parse: function (res) {
            // ODKL.updateCount\(\'[^\']+\'\s*,\s*\'(\d+)\'\)
            var regex = /ODKL\.updateCount\(\'[^\']+\'\s*,\s*\'(\d+)\'\)/i;
            return parseInt(res.match(regex)[1], 10);

        }
    },

    {
        name:  'wykop',
        url:   'http://www.wykop.pl/dataprovider/diggerwidget/?url=%url',
        parse: function (res) {
            var regex = /class=.+wykop-vote-counter[^>]+><a[^>]+>(\d+)/i;
            if (res.match(regex)) {
                return parseInt(res.match(regex)[1], 10);
            }
            return 0;
        }
    }
];

module.exports = networks;