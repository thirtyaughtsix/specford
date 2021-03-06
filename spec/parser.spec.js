var P = require('../src/parser');

describe('Parser', function() {
  beforeEach(function() {
    p = new P('specs/goog.spec');  
  });

  it('has been instantiated with a path', function() {
    expect(p.get('path')).toBe('specs/goog.spec');
  });

  it('records an error for an erroneous path', function() {
    p.set('path', 'specs/bogus.spec');
    p.read();

    waitsFor(function() {
      return !!p.data.error;
    }, 'Parser did not execute the read', 3000);
      
    runs(function() {
      expect(p.get('error')).toBe('Cannot locate file at specs/bogus.spec');
    });
  });

  it('reads a file given the correct path', function() {
    p.read();

    waitsFor(function() {
      return !!p.data.fileContents;
    }, 'Parser did not read the file', 3000);

    runs(function() {
      expect(p.get('fileContents')).toBeTruthy();
    });
  });

  it('Scans, via Lexer, a correctly formatted file', function() {
    p.read();

    waitsFor(function() {
      return !!p.data.tokens;
    }, 'Parser did not lex the file', 3000);

    runs(function() {
      expect(p.get('tokens')).toBeTruthy();
    });
  });
});
