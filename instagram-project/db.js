
import { Low, LowSync } from 'lowdb'
import { JSONFile, JSONFileSync } from 'lowdb/node'
import config from './config.js'

var db;

export async function initDb() {
    db = new LowSync(new JSONFileSync('db.json'), { history: [] })
}


export async function getAccountHistory(username) {
    await db.read()
    var history = db.data.history.filter(x => x.username == username)
    history.forEach(element => {
        element.date = new Date(element.date)
    });
    return history
}

export async function getToBeSharedToday() {
    var accounts = config.accounts.map(x => x.username)
    await db.read()
    db.data.history.forEach(element => {
        element.date = new Date(element.date)
    });
    const now = new Date()
    now.setUTCHours(0, 0, 0, 0)
    var sharedAccounts = db.data.history.filter(x => accounts.includes(x.username) && x.date > now).map(x => x.username);
    var toBeSharedAccountsToday = accounts.filter(x => !sharedAccounts.includes(x))
    console.log(toBeSharedAccountsToday);
    return toBeSharedAccountsToday;
}

export async function addHistory(username) {
    await db.read()
    db.data.history.push({
        username: username,
        date: (new Date())
    })
    await db.write()
}
