import { ActionLogOut } from './actionLoginOut';
import { ActionLogIn } from './actionLogin';
import { History } from './history';
import { Action } from './action';
import { ActionUpdatePerfil } from './actionUpdatePerfil';
import { Change } from './change';
import { ActionBuy } from './actionBuy';
import { ActionMessage } from './actionSentMessage';

const action = new Action('correr', '4/02/2025');
const actionLogIn = new ActionLogIn('PC', '5/09/2029', 'Saltar');
const actionLogout = new ActionLogOut('PC', 2, '5/09/2029', 'Saltar');

const actionChange = new Change(2, 'correr', 'saltar');

const actionUpdatePerfil = new ActionUpdatePerfil('4/02/2025', 'correr');

const actionBuy = new ActionBuy('Remera', 200, '4/02/2025');
const actionMessages = new ActionMessage('Jorge', 'Hola', '4/02/2025');

const historyAction = new History([]);
historyAction.addAction(actionLogIn);
historyAction.addAction(actionLogout);
historyAction.addAction(actionUpdatePerfil);
historyAction.addAction(actionBuy);
historyAction.addAction(actionMessages);

historyAction.showHistory();

