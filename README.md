# 🎮 Mario Teaches Typing - Web Edition
**Divirta-se e aprenda a digitar c/ os 10 dedos em ambiente gamificado, com o Mário!**
<img width="1560" height="975" alt="image" src="https://github.com/user-attachments/assets/0ce4af70-e277-43f0-97a6-37c3d6c13219" />

Obs.: trata-se de uma emulação do clássico jogo educacional "Mario Teaches Typing" (1992/1995) rodando diretamente no navegador.

![Status](https://img.shields.io/badge/status-production-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-Educational-orange)

---

## 🌟 Características

- ✅ **Emulação** - DOSBox rodando no navegador via js-dos
- ✅ **Interface** - Tela de loading animada
- ✅ **Som** - Sound Blaster 16
- ✅ **Performance** - Renderização razoável
- ✅ **Responsivo** - Funciona em diferentes tamanhos de tela (PC e Note)
- ✅ **Zero Instalação** - Jogue direto no navegador

---

## 🛠️ Tecnologias

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Emulador:** js-dos
- **Estilo:** Tailwind CSS
- **Deploy:** Vercel

---

## 📦 Instalação Local

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Passos

```bash
# Clone o repositório
git clone https://github.com/aryribeiro/mario.git

# Entre na pasta
cd mario

# Instale dependências
npm install

# Rode em desenvolvimento
npm run dev

# Abra no navegador
http://localhost:3000
```

---

## 🎯 Como Jogar

1. Aguarde o carregamento (2-3 segundos)
2. O jogo inicia automaticamente
3. Use o teclado para digitar
4. Use o mouse para navegar nos menus
5. Divirta-se aprendendo a digitar!

---

## 📁 Estrutura do Projeto

```
mario/
├── app/                    # Next.js App Router
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/
│   └── DosEmulator.tsx    # Componente do emulador
├── lib/                   # Utilitários
├── public/
│   ├── mario/             # Arquivos originais do jogo (174 arquivos)
│   └── mario.zip          # Bundle compactado (0.93 MB)
└── vercel.json            # Configurações de deploy
```

---

## ⚙️ Configurações Técnicas

### DOSBox

O emulador está configurado com:
- **CPU:** 20000 ciclos fixos (melhor equilíbrio)
- **Core:** Simple (mais estável)
- **Som:** Sound Blaster 16 (44100 Hz)
- **Vídeo:** SVGA S3
- **Renderização:** Pixel-perfect (scaler=none)
- **PC Speaker:** Desabilitado (evita chiado)

### Otimizações Implementadas

1. **Áudio:**
   - Sound Blaster 16 ativado
   - PC Speaker desabilitado
   - Taxa 44100 Hz (qualidade CD)
   - Buffer otimizado (blocksize=1024, prebuffer=25)

2. **Vídeo:**
   - `cycles=fixed 20000` - Equilibrado
   - `scaler=none` - Renderização direta
   - `frameskip=0` - Não pula frames

---

### Configurações na Vercel

- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (automático)
- **Output Directory:** `.next` (automático)
- **Install Command:** `npm install` (automático)

---

## 🐛 Troubleshooting

### Tela preta
- Aguarde o carregamento completo (2-3 segundos)
- Verifique console do navegador (F12)
- Recarregue a página (F5)

### Sem som
- Clique na tela para ativar áudio
- Verifique se navegador permite autoplay
- Verifique volume do sistema

### Teclado não funciona
- Clique na tela do jogo para dar foco
- Recarregue a página (F5)
- Verifique se não há conflitos com atalhos do navegador

### Objetos tremendo
- Isso é normal - característica da emulação DOSBox
- Configuração atual é o melhor equilíbrio possível

### Build falha na Vercel
- Verifique se `npm run build` funciona localmente
- Certifique-se que `public/mario.zip` existe
- Verifique logs no Vercel Dashboard

---

## ⚠️ Notas Importantes

### O que NÃO fazer:

1. **NÃO alterar `cycles=20000`**
   - Valores menores causam tremores
   - Valores maiores causam instabilidade

2. **NÃO mudar `core=simple`**
   - Outros cores causam variação de performance

3. **NÃO ativar `pcspeaker=true`**
   - Causa som ruim

4. **NÃO remover delay de 2s no loading**
   - Terminal MS-DOS ficará visível

5. **NÃO usar `scaler` diferente de `none`**
   - Piora a renderização

### Limitações Conhecidas:

- ⚠️ Chão treme levemente (parece característica do DOSBox)
- ⚠️ Cursor duplicado (mouse do Windows + mouse do jogo)
- ⚠️ Não consegue travar em 60 FPS (parece limitação do js-dos)

---

## 🎓 Créditos

- **Jogo Original:** Mario Teaches Typing (1995)
- **Emulador:** [js-dos](https://js-dos.com)
- **Desenvolvimento:** Modernização para web (2026)

---

## 👨‍💻 Autor

**Ary Ribeiro**

- 📧 Email: [aryribeiro@gmail.com](mailto:aryribeiro@gmail.com)
- 🐙 GitHub: [@aryribeiro](https://github.com/aryribeiro)
- 💼 LinkedIn: [@aryribeiro](https://linkedin.com/in/aryribeiro)

---

## 📄 Licença

Este projeto é apenas para fins educacionais. Mario Teaches Typing é propriedade de seus respectivos donos.

---

**Desenvolvido com ❤️ usando Next.js e js-dos**
