import { ActionLogOut } from './actionLoginOut';
import { ActionLogIn } from './actionLogin';
import { History } from './history';
import { ActionUpdatePerfil } from './actionUpdatePerfil';
import { ActionBuy } from './actionBuy';

const actionLogIn = new ActionLogIn('PC', '5/09/2029', 'Saltar');
const actionLogout = new ActionLogOut('PC', 2, '5/09/2029', 'Saltar');


const actionUpdatePerfil = new ActionUpdatePerfil('4/02/2025', 'correr');

const actionBuy = new ActionBuy('Remera', 200, '4/02/2025');

const historyAction = new History([]);

historyAction.addAction(actionLogIn);
historyAction.addAction(actionLogout);
historyAction.addAction(actionUpdatePerfil);
historyAction.addAction(actionBuy);

historyAction.showHistory();

