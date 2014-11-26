angular.module('driveApiController', [])

    .controller('DriveApiCtrl', function ($scope) {
      var converter = new Showdown.converter({extensions: ['table']});

      $scope.sampleAppsState = {};
      $scope.sampleAppsState.convertedMarkdown = '';

      onMarkdownUpdate();

      // ---  --- //

      function onMarkdownUpdate() {
        var rawMarkdown = '## Hello Markdown!\n\nThis is a super-cool description.\n\n`This` is inline code.\n\n```\nThis is a code block.\n```';
        var rawMarkdown = '## Hello Markdown!\n\nThis is a super-cool description.\n\n`This` is inline code.\n\n```\nThis is a code block.\n```\n\n### A Table!\n\n|Parameter|Type|Required|Read only|Description|\n|--- |--- |--- |--- |--- |\n|navigation|{object}|False|No|Navigation user settings|\n|navigation.users.destinations|{array}|False|No|Favorite destinations (See navigation destination data type)|\n|navigation.users.pois|{array}|False|No|Array of favorite POIs (See navigation POI data type)|\n|navigation.users.routing.calculation|String|False|No|fastest, shortest, offroad|\n|navigation.users.routing.avoiding|{array}|False|No|String array: ["tollways", "highways","parkways"]|';

        var convertedMarkdown = parseMarkdown(rawMarkdown);
        var syntaxHighlightedHtml = parseHtmlForSyntaxHighlighting(convertedMarkdown);

        $scope.sampleAppsState.convertedMarkdown = syntaxHighlightedHtml;
      }

      function parseMarkdown(rawMarkdown) {
        return converter.makeHtml(rawMarkdown);
      }

      function parseHtmlForSyntaxHighlighting(htmlText) {
        // TODO: do we need to support different codeblocks having different languages?
        // TODO: fix this regex to not match '<pre>' within the captured group
        var codeBlockRegex = /<pre>\s*<code>((?:.|\n)*)<\/code>\s*<\/pre>/gi;
        var codeBlockReplacement = '<div hljs source="\'$1\'" class="language-javascript"></div>';

        return htmlText.replace(codeBlockRegex, codeBlockReplacement);
      }
    });
