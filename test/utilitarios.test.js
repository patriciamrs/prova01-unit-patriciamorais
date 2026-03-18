const Utilitarios = require("../src/utilitarios");

describe("Utilitarios", () => {
  let utilitarios;

  beforeEach(() => {
    utilitarios = new Utilitarios();
  });

  // Testes para métodos de string
  describe("Métodos de String", () => {
    test("inverterString deve inverter uma string", () => {
      expect(utilitarios.inverterString("hello")).toBe("olleh");
      expect(utilitarios.inverterString("abc")).toBe("cba");
      expect(utilitarios.inverterString("")).toBe("");
    });

    test("contarCaracteres deve contar os caracteres da string", () => {
      expect(utilitarios.contarCaracteres("hello")).toBe(5);
      expect(utilitarios.contarCaracteres("")).toBe(0);
      expect(utilitarios.contarCaracteres("a")).toBe(1);
    });

    test("paraMaiusculas deve converter para maiúsculas", () => {
      expect(utilitarios.paraMaiusculas("hello")).toBe("HELLO");
      expect(utilitarios.paraMaiusculas("Test")).toBe("TEST");
      expect(utilitarios.paraMaiusculas("ABC")).toBe("ABC");
    });

    test("paraMinusculas deve converter para minúsculas", () => {
      expect(utilitarios.paraMinusculas("HELLO")).toBe("hello");
      expect(utilitarios.paraMinusculas("Test")).toBe("test");
      expect(utilitarios.paraMinusculas("abc")).toBe("abc");
    });

    test("primeiraLetraMaiuscula deve capitalizar a primeira letra", () => {
      expect(utilitarios.primeiraLetraMaiuscula("hello")).toBe("Hello");
      expect(utilitarios.primeiraLetraMaiuscula("test")).toBe("Test");
      expect(utilitarios.primeiraLetraMaiuscula("A")).toBe("A");
    });

    test("removerEspacos deve remover espaços em branco", () => {
      expect(utilitarios.removerEspacos("  hello  ")).toBe("hello");
      expect(utilitarios.removerEspacos("\ttest\n")).toBe("test");
      expect(utilitarios.removerEspacos("no spaces")).toBe("no spaces");
    });

    test("repetirTexto deve repetir o texto n vezes", () => {
      expect(utilitarios.repetirTexto("a", 3)).toBe("aaa");
      expect(utilitarios.repetirTexto("hi", 2)).toBe("hihi");
      expect(utilitarios.repetirTexto("x", 0)).toBe("");
    });

    test("contarPalavras deve contar as palavras em uma string", () => {
      expect(utilitarios.contarPalavras("hello world")).toBe(2);
      expect(utilitarios.contarPalavras("one")).toBe(1);
      expect(utilitarios.contarPalavras("a b c d e")).toBe(5);
    });

    test("ehPalindromo deve verificar se é um palíndromo", () => {
      expect(utilitarios.ehPalindromo("aba")).toBe(true);
      expect(utilitarios.ehPalindromo("racecar")).toBe(true);
      expect(utilitarios.ehPalindromo("hello")).toBe(false);
      expect(utilitarios.ehPalindromo("A man, a plan, a canal: Panama")).toBe(true);
    });
  });

  // Testes para métodos matemáticos
  describe("Métodos Matemáticos", () => {
    test("somar deve somar dois números", () => {
      expect(utilitarios.somar(2, 3)).toBe(5);
      expect(utilitarios.somar(-2, 3)).toBe(1);
      expect(utilitarios.somar(0, 0)).toBe(0);
    });

    test("subtrair deve subtrair dois números", () => {
      expect(utilitarios.subtrair(5, 3)).toBe(2);
      expect(utilitarios.subtrair(2, 5)).toBe(-3);
      expect(utilitarios.subtrair(0, 0)).toBe(0);
    });

    test("multiplicar deve multiplicar dois números", () => {
      expect(utilitarios.multiplicar(2, 3)).toBe(6);
      expect(utilitarios.multiplicar(5, 0)).toBe(0);
      expect(utilitarios.multiplicar(-2, 3)).toBe(-6);
    });

    test("dividir deve dividir dois números", () => {
      expect(utilitarios.dividir(6, 2)).toBe(3);
      expect(utilitarios.dividir(5, 2)).toBe(2.5);
      expect(utilitarios.dividir(0, 5)).toBe(0);
    });

    test("dividir deve lançar erro ao dividir por zero", () => {
      expect(() => utilitarios.dividir(10, 0)).toThrow("Divisão por zero");
    });

    test("ehPar deve verificar se um número é par", () => {
      expect(utilitarios.ehPar(2)).toBe(true);
      expect(utilitarios.ehPar(4)).toBe(true);
      expect(utilitarios.ehPar(1)).toBe(false);
      expect(utilitarios.ehPar(0)).toBe(true);
    });

    test("gerarNumeroAleatorio deve gerar um número entre 0 e max", () => {
      const numero = utilitarios.gerarNumeroAleatorio(100);
      expect(numero).toBeGreaterThanOrEqual(0);
      expect(numero).toBeLessThan(100);
    });

    test("ehNumero deve verificar se é um número", () => {
      expect(utilitarios.ehNumero(42)).toBe(true);
      expect(utilitarios.ehNumero(3.14)).toBe(true);
      expect(utilitarios.ehNumero(0)).toBe(true);
      expect(utilitarios.ehNumero("42")).toBe(false);
      expect(utilitarios.ehNumero(NaN)).toBe(false);
    });
  });

  // Testes para métodos de array
  describe("Métodos de Array", () => {
    test("primeiroElemento deve retornar o primeiro elemento", () => {
      expect(utilitarios.primeiroElemento([1, 2, 3])).toBe(1);
      expect(utilitarios.primeiroElemento(["a", "b"])).toBe("a");
    });

    test("ultimoElemento deve retornar o último elemento", () => {
      expect(utilitarios.ultimoElemento([1, 2, 3])).toBe(3);
      expect(utilitarios.ultimoElemento(["a", "b"])).toBe("b");
    });

    test("tamanhoArray deve retornar o tamanho do array", () => {
      expect(utilitarios.tamanhoArray([1, 2, 3])).toBe(3);
      expect(utilitarios.tamanhoArray([])).toBe(0);
      expect(utilitarios.tamanhoArray([1])).toBe(1);
    });

    test("ordenarArray deve ordenar o array", () => {
      expect(utilitarios.ordenarArray([3, 1, 2])).toEqual([1, 2, 3]);
      expect(utilitarios.ordenarArray(["c", "a", "b"])).toEqual(["a", "b", "c"]);
    });

    test("inverterArray deve inverter o array", () => {
      expect(utilitarios.inverterArray([1, 2, 3])).toEqual([3, 2, 1]);
      expect(utilitarios.inverterArray(["a", "b", "c"])).toEqual(["c", "b", "a"]);
    });

    test("removerDuplicados deve remover elementos duplicados", () => {
      expect(utilitarios.removerDuplicados([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
      expect(utilitarios.removerDuplicados(["a", "a", "b"])).toEqual(["a", "b"]);
    });

    test("juntarArray deve juntar array com separador", () => {
      expect(utilitarios.juntarArray([1, 2, 3])).toBe("1,2,3");
      expect(utilitarios.juntarArray(["a", "b", "c"], "-")).toBe("a-b-c");
      expect(utilitarios.juntarArray([1, 2, 3], " ")).toBe("1 2 3");
    });

    test("mediaArray deve calcular a média do array", () => {
      expect(utilitarios.mediaArray([1, 2, 3])).toBe(2);
      expect(utilitarios.mediaArray([10, 20, 30])).toBe(20);
      expect(utilitarios.mediaArray([5])).toBe(5);
      expect(utilitarios.mediaArray([])).toBe(0);
    });
  });

  // Testes para métodos de objeto
  describe("Métodos de Objeto", () => {
    test("mesclarObjetos deve mesclar dois objetos", () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { b: 3, c: 4 };
      expect(utilitarios.mesclarObjetos(obj1, obj2)).toEqual({ a: 1, b: 3, c: 4 });
    });

    test("mesclarObjetos deve retornar novo objeto sem modificar originais", () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      const resultado = utilitarios.mesclarObjetos(obj1, obj2);
      expect(obj1).toEqual({ a: 1 });
      expect(obj2).toEqual({ b: 2 });
      expect(resultado).toEqual({ a: 1, b: 2 });
    });
  });
});
