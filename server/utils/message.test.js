const expect= require('expect');
var {generateMessage}= require('./message.js');

describe('GenerateMessage',()=>{
  it('should generate the correct message', ()=>{
    var from="Amel";
    var text="text test";
  var  res= generateMessage(from,text);
    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
  
  });
});
