import assert from 'node:assert/strict';
import test from 'node:test';
import { splitArticleNotes } from './article-notes';
const start='<!-- article-notes:start -->', end='<!-- article-notes:end -->';
test('only explicitly marked material becomes notes; reader warning stays body',()=>{
 const chunks=splitArticleNotes(`Reader warning\n${start}\nDisclaimer\n${end}\nConclusion`);
 assert.deepEqual(chunks,[{kind:'markdown',body:'Reader warning'},{kind:'notes',body:'Disclaimer'},{kind:'markdown',body:'Conclusion'}]);
});
test('ordinary articles preserve original CRLF content',()=>{
 const body='Text\r\n\r\nConclusion'; assert.deepEqual(splitArticleNotes(body),[{kind:'markdown',body}]);
});
test('invalid boundaries preserve all content',()=>{
 for(const body of [`${start}\nText`,`${start}\n${end}`,`${start}\nText\n${start}\nMore\n${end}\n${end}`,`${end}\nText\n${start}`]) assert.deepEqual(splitArticleNotes(body),[{kind:'markdown',body}]);
});
test('markers inside code examples never change the reading level',()=>{
 for(const fence of ['```','~~~']){const body=`${fence}md\n${start}\nExample\n${end}\n${fence}`;assert.deepEqual(splitArticleNotes(body),[{kind:'markdown',body}]);}
});
