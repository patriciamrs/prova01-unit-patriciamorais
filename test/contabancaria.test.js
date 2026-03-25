const ContaBancaria = require('../src/contabancaria');

describe("ContaBancaria", () => {
  let conta;
  let contaBancaria;

  beforeEach(() => {
    conta = {
      id: 1,
      titular: "Patricia",
      saldo: 1000,
      limite: 500,
      status: "ativa",
      atualizadaEm: null
    };

    contaBancaria = new ContaBancaria(conta);
  });

  test("obter saldo", () => {
    expect(contaBancaria.obterSaldo()).toBe(1000);
  });

  test("obter titular", () => {
    expect(contaBancaria.obterTitular()).toBe("Patricia");
  });

  test("obter status", () => {
    expect(contaBancaria.obterStatus()).toBe("ativa");
  });

  test("verificar se a conta está ativa", () => {
    expect(contaBancaria.estaAtiva()).toBe(true);
  });   

  test("obter limite", () => {
    expect(contaBancaria.obterLimite()).toBe(500);
  });

  test("depositar valor", () => {
    expect(contaBancaria.depositar(500)).toBe(true);
    expect(contaBancaria.obterSaldo()).toBe(1500);
  });

  test("não deve depositar valor zero ou negativo", () => {
    expect(contaBancaria.depositar(0)).toBe(false);
    expect(contaBancaria.depositar(-10)).toBe(false);
    expect(contaBancaria.obterSaldo()).toBe(1000);
  });

  test("sacar valor", () => {
    expect(contaBancaria.sacar(200)).toBe(true);
    expect(contaBancaria.obterSaldo()).toBe(800);
  });

  test("não deve sacar valor zero ou negativo", () => {
    expect(contaBancaria.sacar(0)).toBe(false);
    expect(contaBancaria.sacar(-50)).toBe(false);
  });

  test("não deve sacar acima do saldo disponível", () => {
   expect(contaBancaria.sacar(2000)).toBe(false);
   expect(contaBancaria.obterSaldo()).toBe(1000);
  });

  test("alterar titular", () => {
    expect(contaBancaria.alterarTitular("Maria")).toBe(true);
    expect(contaBancaria.obterTitular()).toBe("Maria");
  });

  test("bloquear conta", () => {
    expect(contaBancaria.bloquearConta()).toBe(true);
    expect(contaBancaria.obterStatus()).toBe("bloqueada");
  });

  test("não deve bloquear conta já bloqueada", () => {
    contaBancaria.bloquearConta();
    expect(contaBancaria.bloquearConta()).toBe(false);
    expect(contaBancaria.obterStatus()).toBe("bloqueada");
  });

  test("ativar conta bloqueada", () => {
    contaBancaria.bloquearConta();
    expect(contaBancaria.estaAtiva()).toBe(false);
    expect(contaBancaria.obterStatus()).toBe("bloqueada");
  });

  test("não deve ativar conta já ativa", () => {
    expect(contaBancaria.ativarConta()).toBe(false);
    expect(contaBancaria.obterStatus()).toBe("ativa");
  });

  test("não deve encerrar conta com saldo diferente de zero", () => {
    expect(contaBancaria.encerrarConta()).toBe(false);
    expect(contaBancaria.obterStatus()).toBe("ativa");
  });

  test("deve encerrar conta com saldo zero", () => {
    conta.saldo = 0;
    contaBancaria = new ContaBancaria(conta);

    expect(contaBancaria.encerrarConta()).toBe(true);
    expect(contaBancaria.obterStatus()).toBe("encerrada");
  });

  test("encerrar conta", () => {
    contaBancaria.bloquearConta();
    expect(contaBancaria.estaAtiva()).toBe(false);
  });

  test("deve permitir sacar valor dentro do limite", () => {
  expect(contaBancaria.podeSacar(1000)).toBe(true);
  });

  test("deve permitir sacar usando limite", () => {
  expect(contaBancaria.podeSacar(1500)).toBe(true);
  });

  test("não deve permitir sacar acima do saldo disponível", () => {
  expect(contaBancaria.podeSacar(1600)).toBe(false);
  });

  test("não deve permitir sacar valor zero", () => {
  expect(contaBancaria.podeSacar(0)).toBe(false);
  });

  test("não deve permitir sacar valor negativo", () => {
  expect(contaBancaria.podeSacar(-100)).toBe(false);
  });

  test("aplicar tarifa", () => {
    expect(contaBancaria.aplicarTarifa(50)).toBe(true);
    expect(contaBancaria.obterSaldo()).toBe(950);
  });

  test("ajustar limite", () => {
    expect(contaBancaria.ajustarLimite(200)).toBe(true);
    expect(contaBancaria.obterLimite()).toBe(200);
  });

  test("deve retornar true quando o saldo for negativo", () => {
  conta.saldo = -100;
  contaBancaria = new ContaBancaria(conta);

  expect(contaBancaria.saldoNegativo()).toBe(true);
  });

  test("deve retornar false quando o saldo não for negativo", () => {
  conta.saldo = 100;
  contaBancaria = new ContaBancaria(conta);

    expect(contaBancaria.saldoNegativo()).toBe(false);
  });

  test("deve retornar false quando o saldo for zero", () => {
  conta.saldo = 0;
  contaBancaria = new ContaBancaria(conta);

  expect(contaBancaria.saldoNegativo()).toBe(false);
  });

  test("deve transferir valor para outra conta", () => {
    const contaDestino = new ContaBancaria({
        id: 2,
        titular: "João",
        saldo: 500,
        limite: 200,
        status: "ativa",
        atualizadaEm: null
   });

    const resultado = contaBancaria.transferir(200, contaDestino);

    expect(resultado).toBe(true);
    expect(contaBancaria.obterSaldo()).toBe(800);
    expect(contaDestino.obterSaldo()).toBe(700);
    });

    test("calcular saldo disponível", () => {
    const saldoDisponivel = contaBancaria.calcularSaldoDisponivel();
    expect(saldoDisponivel).toBe(1500);
  });

  test("gerar resumo da conta", () => {
    const resumo = contaBancaria.gerarResumo();
    expect(resumo).toEqual({
      titular: "Patricia",
      saldo: 1000,
      limite: 500,
      disponivel: 1500,
      status: "ativa"
    });
  });

  test("deve retornar true para conta válida", () => {
    expect(contaBancaria.validarConta()).toBe(true);
  });

  test("não deve validar conta sem id", () => {
    conta.id = null;
    contaBancaria = new ContaBancaria(conta);

    expect(contaBancaria.validarConta()).toBe(false);
  });

  test("não deve validar conta sem titular", () => {
    conta.titular = "";
    contaBancaria = new ContaBancaria(conta);

    expect(contaBancaria.validarConta()).toBe(false);
  });

  test("não deve validar conta com saldo não numérico", () => {
    conta.saldo = "1000";
    contaBancaria = new ContaBancaria(conta);

    expect(contaBancaria.validarConta()).toBe(false);
  });

  test("não deve validar conta com limite negativo", () => {
    conta.limite = -100;
    contaBancaria = new ContaBancaria(conta);

    expect(contaBancaria.validarConta()).toBe(false);
  });

  test("não deve validar conta com status inválido", () => {
    conta.status = "pendente";
    contaBancaria = new ContaBancaria(conta);

    expect(contaBancaria.validarConta()).toBe(false);
  });

  test("deve resetar a conta corretamente", () => {
  conta.saldo = 500;
  conta.limite = 200;
  conta.status = "bloqueada";
  conta.atualizadaEm = null;

  contaBancaria = new ContaBancaria(conta);

  contaBancaria.resetarConta();

  expect(contaBancaria.obterSaldo()).toBe(0);
  expect(contaBancaria.obterLimite()).toBe(0);
  expect(contaBancaria.obterStatus()).toBe("ativa");
  expect(contaBancaria.conta.atualizadaEm).toBeInstanceOf(Date);
  });

});
