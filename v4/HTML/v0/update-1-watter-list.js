#!/usr/bin/env node
/**
 * src/ 配下の各フォルダ（1-watter, 2-small-dog, 3-other, 4-surroundings, site_no1, site_no2, site_no3）
 * 内の画像を列挙し、list.json を更新します。
 * 実行: node update-1-watter-list.js（v0 フォルダで実行）
 */

const fs = require('fs');
const path = require('path');

const FOLDERS = ['1-watter', '2_dog', '2-small-dog', '3_els', '3-other', '4_nearby', '4-surroundings', 'site_no1', 'site_no2', 'site_no3'];
const IMG_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);
const SRC = path.join(__dirname, 'src');

FOLDERS.forEach(function (folderName) {
  var dir = path.join(SRC, folderName);
  var listPath = path.join(dir, 'list.json');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(listPath, '[]\n', 'utf8');
    console.log(folderName + ': created, list.json = []');
    return;
  }
  var names = fs.readdirSync(dir)
    .filter(function (name) {
      var ext = path.extname(name).toLowerCase();
      return IMG_EXT.has(ext);
    })
    .sort();
  fs.writeFileSync(listPath, JSON.stringify(names, null, 2) + '\n', 'utf8');
  console.log(folderName + ':', names.length, 'image(s)', names.length ? '— ' + names.join(', ') : '');
});
