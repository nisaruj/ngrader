var app = angular.module("myApp", ['textAngular']);

app.controller('AppCtrl', function($scope) {
    
    $scope.name = "New Problem";
    $scope.time = "1";
    $scope.mem = "32";
    $scope.diff = "0";
    var probHtml = 
    '<h2 style="text-align: center;">' + $scope.name + '</h2>' +
    '<h6 style="text-align: center;">Time Limit: ' + $scope.time + ' seconds</h6>' +
    '<h6 style="text-align: center;">Memory Limit: ' + $scope.mem + ' megabytes</h6>'
    ;
    $scope.htmlVariable = "<p style=\"text-align: center;\"><i>\"ngrader is a programming judge that helps you improve your coding skill. Thanks to Judge0 API, it supports over 20 languages such as c, c++, python, java blah blah blah. You can register for free by click <a href=\"/register\">here</a> and just fill username password and email. Sounds easy, isn't it? It's also open source project on Github. Feel free to contribute!\"</i></p> \
    <p><b>Welcome to ngrader!</b> This problem template contains some markup examples for problem writer.<br></p> \
    <ul> \
        <li>Basic HTML elements such as header, <b>bold</b>, <i>italic</i>, <u>underline</u>, <strike>strikethrough,</strike> <a href=\"#\">hyperlink</a>.</li> \
        <li><code>printf(\"You can insert some codes.\");</code></li> \
        <li>Unicode is supported. ภาษาไทย 日本語</li> \
        <li>Math equation? You can do too.  \\(\\sum_{i=1}^{n} i^2 = {n(n+1)(2n+1) \\over 6}\\) <a href=\"https://en.wikibooks.org/wiki/LaTeX/Mathematics\" target=\"_blank\">Unfamiliar with LaTeX?</a></li> \
    </ul> \
    <p>This problem is an easy one: given integer <b>a</b> and <b>b</b>, calculate <b>a+b</b>.</p> \
    <p><b>Input</b><br>The first line of input contains two integers, \\(a\\) and \\(b\\) \\((|a|, |b| &lt;= 10^9)\\)</p> \
    <p><b>Output</b><br>One integer — the result of a+b.</p> \
    <p><b>Example</b></p> \
    <div class=\"example\"> \
    <div class=\"title\">Input</div> \
    <div class=\"data\"><pre>1 2</pre></div>\
    <div class=\"title\">Output</div>\
    <div class=\"data\"><pre>3</pre></div>\
    </div>\
    <div class=\"example\">\
    <div class=\"title\">Input</div>\
    <div class=\"data\"><pre>13 37</pre></div>\
    <div class=\"title\">Output</div>\
    <div class=\"data\"><pre>50</pre></div>\
    </div>";
    $scope.desc = $scope.htmlVariable;
    $scope.myHTML = probHtml + '<div class="prob-desc">' + $scope.htmlVariable + '</div>';

    $scope.change = function() {
        probHtml = 
            '<h2 style="text-align: center;">' + $scope.name + '</h2>' +
            '<h6 style="text-align: center;">Time Limit: ' + $scope.time + ' seconds</h6>' +
            '<h6 style="text-align: center;">Memory Limit: ' + $scope.mem + ' megabytes</h6>' + 
            '<div class="prob-desc">' + $scope.htmlVariable + '</div>';
        $scope.desc = $scope.htmlVariable;
        $scope.myHTML = probHtml;
    }
});