export const helmetConfig = {
  crossOriginEmbedderPolicy: true, // Habilita a política de incorporador de origem cruzada (COEP)
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Permite carregar recursos apenas do próprio domínio
      imgSrc: [
        "'self'",
        'data:',
        'apollo-server-landing-page.cdn.apollographql.com',
      ],
      scriptSrc: ["'self'", "'strict-dynamic'"], // Permite scripts do próprio domínio e confia em scripts carregados dinamicamente
      styleSrc: ["'self'", "'unsafe-inline'"], // Permite estilos do próprio domínio e estilos inline
      manifestSrc: [
        "'self'",
        'apollo-server-landing-page.cdn.apollographql.com',
      ],
      frameSrc: ["'self'", 'sandbox.embed.apollographql.com'],
    },
  },
  hsts: {
    // Habilita a política de segurança de transporte estrito HTTP (HSTS)
    maxAge: 31536000, // Define o tempo máximo de idade para um ano
    includeSubDomains: true, // Aplica a política a todos os subdomínios
    preload: true, // Permite a inclusão na lista de pré-carregamento HSTS
  },
  referrerPolicy: { policy: 'no-referrer' }, // Não envia o cabeçalho de referência
};
