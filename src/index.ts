import { ActionLogOut } from './actionLoginOut';
import { ActionLogIn } from './actionLogin';
import { History} from './history';
import { Action } from './action';
import { ActionUpdatePerfil } from './actionUpdatePerfil';

const action = new Action('correr', '4/02/2025');
const actionLogIn = new ActionLogIn('PC', '5/09/2029', 'Saltar');
const actionLogout = new ActionLogOut('PC', 2, '5/09/2029', 'Saltar');
const actionUpdatePerfil= new ActionUpdatePerfil('4/02/2025','correr')
const historyAction = new History([])
historyAction.addAction(action);
historyAction.addAction(actionLogIn);
historyAction.addAction(actionLogout);
historyAction.addAction(actionLogout);
historyAction.addAction(actionUpdatePerfil)
historyAction.showHistory()