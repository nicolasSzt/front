import { ActionLogOut } from './actionLoginOut';
import { ActionLogIn } from './actionLogin';
import { History } from './history';
import { ActionUpdatePerfil } from './actionUpdatePerfil';
import { ActionBuyBuilder } from './actionBuy/actionButByuilder';

const actionLogIn = new ActionLogIn('PC', '5/09/2029', 'Saltar');
const actionLogout = new ActionLogOut('PC', 2, '5/09/2029', 'Saltar');


const actionUpdatePerfil = new ActionUpdatePerfil('4/02/2025', 'correr');

const actionBuy = new ActionBuyBuilder()
    .setDescription('Compra de productos')
    .setCreatedAt('4/02/2025')
    .setProducts(['producto1', 'producto2'])
    .setTotal(100)
    .build();

const historyAction = new History([]);

historyAction.addAction(actionLogIn);
historyAction.addAction(actionLogout);
historyAction.addAction(actionUpdatePerfil);
historyAction.addAction(actionBuy);

historyAction.showHistory();

