drop database overlock;

create database overlock;

use overlock;

create table planos(
    id_planos int auto_increment primary key,
    nome_plano int not null,
    descricao_plano int not null,
    valor_plano int not null
);

insert into planos ( id_planos , nome_plano , descricao_plano , valor_plano )
values ( 1 , 1 , 1 , 1 );

insert into planos ( id_planos , nome_plano , descricao_plano , valor_plano )
values ( 2 , 2 , 2 , 2 );

create table tipo_usuario(
    id_tipo_usuario int auto_increment primary key ,
    tipo_usuario varchar(2) not null
);

insert into tipo_usuario ( id_tipo_usuario , tipo_usuario )
values ( 1 , 1 );

insert into tipo_usuario ( id_tipo_usuario , tipo_usuario )
values ( 2 , 2 );

create table usuario(
    id_usuario int auto_increment primary key,
    user_name varchar(20) not null,
    nome varchar(45) not null,
    telefone varchar(14) not null,
    data_nasc date not null,
    foto_perfil_pasta longblob,
    foto_perfil_banco longblob,
    cep varchar(11),
    cidade varchar(45) not null,
    rua varchar(45) not null,
    numero varchar(5) not null,
    cpf varchar(14) not null,
    email varchar(100) not null,
    senha varchar(100) not null,
    status_usuario varchar(2) not null default '1',
    id_tipo_usuario int default '1',
    foreign key (id_tipo_usuario) references tipo_usuario(id_tipo_usuario),
    id_planos int default '1',
    foreign key (id_planos) references planos(id_planos)
);

insert into usuario (user_name, nome, telefone, data_nasc, cep, cidade, numero, rua, cpf, email, senha, id_tipo_usuario,id_planos)
values ('SophiCarvalho', 'sophia carvalho', '11 93116102', '1995-01-11', '06415-070', 'barueri', '238', 'Rua duque de caxias', '700.605.048-03', 'sophiacarvalho@gmail.com', '$2a$12$ZLjDIU9Nj9Kwc4YcxYEIeu/E9JDr8tD0hPpJscG1YkXXcZqxSFODy', '1', '1');


insert into usuario (user_name, nome, telefone, data_nasc, cep, cidade, numero, rua, cpf, email, senha, id_tipo_usuario,id_planos)
values ('Anali_', 'Ana luiza', '11 97483280', '2003-07-04', '06473-005', 'barueri', '500', 'Avenida andromeda', '220.749.126-92', 'Analuiza@gmail.com', '$2a$12$ZLjDIU9Nj9Kwc4YcxYEIeu/E9JDr8tD0hPpJscG1YkXXcZqxSFODy', '1', '1');

select * from usuario;
CREATE TABLE servicos(
    id_servicos int auto_increment primary key,
    ajuste BIT,
    person BIT,
    criacao BIT,
    id_usuario INT not null,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);



create table proposta(
    id_proposta int auto_increment primary key,
    tipo_roupa varchar(20) not null,
    categoria varchar(20) not null,
    descricao varchar(100) not null,
    foto_proposta mediumblob,
    id_usuario int not null,
    foreign key (id_usuario) references usuario(id_usuario)
);

create table pedido(
    id_pedido int auto_increment primary key,
    tipo_roupa varchar(20) not null,
    categoria varchar(20) not null,
    descricao varchar(100) not null,
    foto_proposta mediumblob,
    valor_pedido decimal not null,
    id_usuario int not null,
    foreign key (id_usuario) references usuario(id_usuario)
);

create table orcamento(
    id_orcamento int auto_increment primary key,
    valor_orcamento decimal not null,
    id_proposta int not null,
    foreign key (id_proposta) references proposta(id_proposta),
    id_usuario int not null,
    foreign key (id_usuario) references usuario(id_usuario)
);

create table usuario_has_pedido(
    id_usuario int not null,
    foreign key (id_usuario) references usuario(id_usuario),
    id_pedido int not null,
    foreign key (id_pedido) references pedido(id_pedido)
);
