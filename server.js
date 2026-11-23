const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const CAVERNS = [
  {
    id: "caverna_cristal",
    nome: "Caverna dos Cristais Puros",
    dificuldade: "Moderada",
    chance_sucesso: 75,
    base_bottles: 140,
    multiplicador: 1.25,
    descricao: "Cristais antigos refletem o brilho dos Bottles perdidos nas fendas."
  },
  {
    id: "abismo_rubro",
    nome: "Abismo Rubro Profundo",
    dificuldade: "Alta",
    chance_sucesso: 60,
    base_bottles: 220,
    multiplicador: 1.6,
    descricao: "Calor intenso e correntes instáveis escondem grandes lotes de Bottles."
  },
  {
    id: "gruta_gelada",
    nome: "Gruta Gélida Esquecida",
    dificuldade: "Leve",
    chance_sucesso: 85,
    base_bottles: 100,
    multiplicador: 1.1,
    descricao: "Túneis silenciosos de gelo azul ideais para buscas rápidas."
  }
];

function getActiveCavern() {
  const horaAtual = Math.floor(Date.now() / (1000 * 60 * 60));
  const caverna = CAVERNS[horaAtual % CAVERNS.length];

  const diaSemana = new Date().getDay();
  const isWeekend = diaSemana === 0 || diaSemana === 6;
  const bonusEvento = isWeekend ? 1.25 : 1.0;

  return {
    status: "ok",
    caverna_id: caverna.id,
    caverna_nome: caverna.nome,
    dificuldade: caverna.dificuldade,
    chance_sucesso: caverna.chance_sucesso,
    base_bottles: caverna.base_bottles,
    multiplicador_total: Number((caverna.multiplicador * bonusEvento).toFixed(2)),
    evento_ativo: isWeekend ? "Fim de Semana em Dobro (+25%)" : "Exploração Padrão",
    descricao: caverna.descricao
  };
}

app.get("/", (req, res) => {
  res.json({
    bot: "BottleBOT",
    status: "online",
    rota_caverna: "/api/caverna-ativa"
  });
});

app.get("/api/caverna-ativa", (req, res) => {
  res.json(getActiveCavern());
});

app.listen(PORT, () => {
  console.log(`BottleBOT Cavern API rodando na porta ${PORT}`);
});
