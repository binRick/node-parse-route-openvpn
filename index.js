#!/usr/bin/env node

var fs = require('fs'),
    child = require('child_process'),
    _ = require('underscore'),
    async = require('async'),
    l = console.log,
    c = require('chalk'),
    pj = require('prettyjson');

var files = child.execSync('./listFiles.sh').toString().split("\n").filter(function(l) {
    return l;
});

async.map(files, function(file, _cb) {
    fs.readFile(file, function(e, fdat) {
        if (e) throw e;
        fdat = fdat.toString().split("\n").filter(function(l) {
            return l;
        });
        var name = fdat[0].replace("# ", "");
        var networks = fdat.slice(1, fdat.length).filter(function(l) {
            return l;
        }).map(function(l) {
            l = l.split(' ');
            return l[1] + '/' + l[2];
        });

        var f = {
            name: name,
            networks: networks
        };

        _cb(null, f);
    });
}, function(e, fileResults) {
    if (e) throw e;
    l(fileResults);
});
