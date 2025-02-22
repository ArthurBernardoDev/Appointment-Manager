# Projeto - Plataforma de Agendamento Odontológico

## Fase 1 - Funcionalidades Essenciais (MVP)

### 1. Cadastro e autenticação de usuários

- [x] Pacientes e dentistas podem se cadastrar e fazer login.
- [x] Implementação de autenticação JWT.
- [x] Recuperação de senha via e-mail.

### 2. Perfis de dentistas

- Criação e edição de perfil com foto, especialidades, endereço da clínica e descrição (upload no s3 aws, lambda para converter fotos para .webp).
- Exibição de avaliações e comentários.

### 3. Agendamento de consultas

- Paciente pode visualizar horários disponíveis e marcar consultas.
- Dentistas podem definir horários de atendimento e gerenciar agenda.

### 4. Listagem e busca de dentistas

- Filtros por especialidade, localização, preço e avaliações.
- Ordenação por relevância e disponibilidade.

### 5. Dashboard para dentistas

- Exibição de consultas agendadas.
- Histórico de pacientes atendidos.

---

## Fase 2 - Funcionalidades Avançadas

### 6. Sistema de pagamentos online

- Opção de pagamento antecipado para consultas.
- Integração com gateways de pagamento (ex: Stripe, MercadoPago).

### 7. Lembretes e notificações

- Envio de lembretes automáticos de consulta via e-mail e WhatsApp.
- Notificação para dentistas sobre novos agendamentos.

### 8. Sistema de avaliações e feedbacks

- Pacientes podem avaliar e comentar sobre consultas.
- Exibição da média de avaliações nos perfis dos dentistas.

### 9. Plano de saúde e convênios

- Dentistas podem informar quais convênios aceitam.
- Pacientes podem filtrar dentistas por convênio.

---

## Fase 3 - Expansão e Diferenciais

### 10. Teleconsulta e chat integrado

- Opção de consulta online via vídeo.
- Chat entre paciente e dentista para dúvidas rápidas.

### 11. Histórico médico do paciente

- Registro de consultas passadas.
- Upload de exames e prescrições.

### 12. Gamificação e fidelização

- Sistema de pontos para pacientes que agendam consultas regularmente.
- Benefícios como descontos para usuários frequentes.

### 13. Área de conteúdos e blog

- Artigos sobre saúde bucal escritos por especialistas.
- Vídeos educativos e dicas de odontologia.

### 14. Plano premium para dentistas

- Destaque nos resultados de busca.
- Acesso a relatórios avançados sobre consultas.
