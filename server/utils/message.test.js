const expect= require('expect');
var {generateMessage,generateLocationMessage}= require('./message.js');

describe('GenerateMessage',()=>{
  it('should generate the correct message', ()=>{
    var from="Amel";
    var text="text test";
  var  res= generateMessage(from,text);
    expect(res.from).toBe(from);
    expect(res.text).toBe(text);

  });
});

describe('generateLocationMessage', ()=>{
  it('should generate correct location object', ()=>{
    var from = 'Deb';
    var lat = 15;
    var long = 19;
    var url = 'https://www.google.com/maps?q=15,19';
    res= generateLocationMessage(from,lat,long);
    expect(res.from).toBe(from);
    expect(res.url).toBe(`https://www.google.com/maps?q=${lat},${long}`)
  });
});
