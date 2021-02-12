'use strict'

const out = new LogoutButton();

out.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    });
};

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const rate = new RatesBoard();

function rateBoards (rate) {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            rate.clearTable();
            rate.fillTable(response.data);
        }
    });
}

rateBoards(rate);
setInterval(rateBoards, 60000, rate);

const money = new MoneyManager();

money.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, 'Действие выполнено успешно');
        } else {
            money.setMessage(false, 'Ошибка выполнения');
        }
    });
}

money.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, 'Действие выполнено успешно');
        } else {
            money.setMessage(false, 'Ошибка выполнения');
        }
    });
}

money.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, 'Действие выполнено успешно');
        } else {
            money.setMessage(false, 'Ошибка выполнения');
        }
    });
}

const favorite = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success) {
        favorite.clearTable();
        favorite.fillTable(response.data);
        money.updateUsersList(response.data);
    }
});

favorite.addUserCallback = () => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favorite.clearTable();
            favorite.fillTable(response.data);
            money.updateUsersList(response.data);
            favorite.setMessage(true, 'Действие выполнено успешно');
        } else {
            favorite.setMessage(false, 'Ошибка выполнения');
        }
    });
}

favorite.removeUserCallback = () => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favorite.clearTable();
            favorite.fillTable(response.data);
            money.updateUsersList(response.data);
            favorite.setMessage(true, 'Действие выполнено успешно');
        } else {
            favorite.setMessage(false, 'Ошибка выполнения');
        }
    });
}