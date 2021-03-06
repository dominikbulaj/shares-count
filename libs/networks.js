var networks = [
    {
        name:  'facebook',
        url:   'http://graph.facebook.com/?id=%url',
        parse: function (res) {
            // json decode
            var resObj = JSON.parse(res);

            return resObj.shares || resObj.likes || 0;
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
        name:  'pinterest',
        url:   'http://api.pinterest.com/v1/urls/count.json?callback=pins&url=%url',
        parse: function (res) {

            function pins(data) {
                return data.count || 0;
            }

            return eval(res);
        }
    },

    {
        name:  'linkedin',
        url:   'http://www.linkedin.com/countserv/count/share?url=%url&format=json',
        parse: function (res) {
            // json decode
            return JSON.parse(res).count || 0;
        }
    },

    {
        name:  'stumbleupon',
        url:   'http://www.stumbleupon.com/services/1.01/badge.getinfo?url=%url',
        parse: function (res) {
            // json decode
            var jsonData = JSON.parse(res);
            if (jsonData.success && jsonData.result.in_index) {
                return jsonData.result.views;
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
        },
        timeout:10000,
        disabled: true
    },

    {
        name:  'odnoklassniki',
        url:   'http://www.odnoklassniki.ru/dk?st.cmd=extLike&uid=odklcnt0&ref=%url',
        parse: function (res) {
            // ODKL.updateCount\(\'[^\']+\'\s*,\s*\'(\d+)\'\)
            var regex = /ODKL\.updateCount\(\'[^\']+\'\s*,\s*\'(\d+)\'\)/i;
            return parseInt(res.match(regex)[1], 10);

        },
        disabled: true
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
        },
        disabled: true
    }
];

module.exports = networks;