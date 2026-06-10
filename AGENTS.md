# Expo SDK 54

Ao trabalhar em projetos Expo:

- Nunca assumir APIs ou comportamentos de versões anteriores.
- Consultar obrigatoriamente a documentação da versão 54.
- Utilizar apenas APIs oficialmente documentadas para SDK 54.
- Em caso de conflito entre conhecimento prévio e documentação oficial, a documentação oficial tem prioridade.

https://docs.expo.dev/versions/v54.0.0/

## Regra de commits obrigatórios

Toda alteração de arquivo deve gerar um commit APÓS validação bem-sucedida.

Executar:

```bash
git status
git diff
```

Após validar:

```bash
git add .
git commit -m "<tipo>: <descrição>"
```

### Exemplos de tipos de commit:

- `feat:` Adiciona nova funcionalidade
- `fix:` Corrige bug
- `refactor:` Refatora código
- `chore:` Atualiza dependências ou configuração
- `docs:` Atualiza documentação

Após o commit:

```bash
git rev-parse --short HEAD
```

## Regra de segurança

Nunca:

- Expor senhas.
- Expor tokens.
- Expor chaves privadas.
- Expor credenciais.
- Comitar arquivos `.env`.

Adicionar ao `.gitignore` quando necessário.

Nunca commitar:

```text
.env
.env.*
node_modules/
.expo/
dist/
build/
coverage/
```

Respeitar sempre o .gitignore do projeto.

# Validação obrigatória para projetos Expo

Executar antes do commit:

```bash
npx expo-doctor
```

Se TypeScript estiver habilitado:

```bash
npx tsc --noEmit
```

Se existir lint:

```bash
npm run lint
```

Atualizar documentação apenas quando a alteração impactar:

- instalação
- configuração
- arquitetura
- APIs públicas
- funcionalidades visíveis ao usuário