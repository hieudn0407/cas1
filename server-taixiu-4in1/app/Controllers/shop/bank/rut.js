
var Bank_history = require('../../../Models/Bank/Bank_history');
var UserInfo = require('../../../Models/UserInfo');
var OTP = require('../../../Models/OTP');
var Phone = require('../../../Models/Phone');
var validator = require('validator');

module.exports = function (client, data) {
    if (!!data.bank && !!data.number && !!data.name && !!data.rut) {
        if (!validator.isLength(data.bank, {
                min: 1,
                max: 32
            })) {
            client.red({
                notice: {
                    title: 'ERROR',
                    text: 'Invalid bank...'
                }
            });
        } else if (!validator.isLength(data.number, {
                min: 1,
                max: 32
            })) {
            client.red({
                notice: {
                    title: 'ERROR',
                    text: 'Invalid account number...'
                }
            });
        } else if (!validator.isLength(data.name, {
                min: 1,
                max: 32
            })) {
            client.red({
                notice: {
                    title: 'ERROR',
                    text: 'Invalid bank...'
                }
            });
        } else if (!validator.isLength(data.rut, {
                min: 5,
                max: 10
            })) {
            client.red({
                notice: {
                    title: 'ERROR',
                    text: 'Invalid amount...'
                }
            });
        } else {
            Bank_history.findOne({
                uid: client.UID,
                type: 1
            }, 'time', {
                sort: {
                    'time': -1
                }
            }, function (err, last) {
                if (!!last) {
                    if (((new Date() - Date.parse(last.time)) / 1000) < 1) {
                        client.red({
                            notice: {
                                title: 'ERROR',
                                text: 'Each withdrawal must be at least 30 minutes apart'
                            }
                        });
                    } else {

                        UserInfo.findOne({
                            'id': client.UID
                        }, 'red', function (err3, dU) {
                            if (dU) {
                                var rut = data.rut >> 0;
                                if (rut < 30000) {
                                    client.red({
                                        notice: {
                                            title: 'FAILURE',
                                            text: 'Minimum withdrawal amount is 30,000 RED.!'
                                        }
                                    });
                                } else {
                                    if (dU.red >= rut) {
                                        Bank_history.create({
                                            uid: client.UID,
                                            bank: data.bank,
                                            number: data.number,
                                            name: data.name,
                                            money: rut,
                                            type: 1,
                                            time: new Date()
                                        });
                                        UserInfo.updateOne({
                                            id: client.UID
                                        }, {
                                            $inc: {
                                                'red': -rut
                                            }
                                        }).exec();
                                        client.red({
                                            notice: {
                                                title: 'SUCCESS',
                                                text: 'Withdrawal request is being processed.'
                                            },
                                            user: {
                                                red: dU.red - rut
                                            }
                                        });
                                    } else {
                                        client.red({
                                            notice: {
                                                title: 'FAILURE',
                                                text: 'Insufficient balance.!'
                                            }
                                        });
                                    }
                                }
                            }

                        });
                    }
                } else {
                    UserInfo.findOne({
                        'id': client.UID
                    }, 'red', function (err3, dU) {
                        if (dU) {
                            var rut = data.rut >> 0;
                            if (rut < 30000) {
                                client.red({
                                    notice: {
                                        title: 'FAILURE',
                                        text: 'Minimum withdrawal amount is 30,000 RED.!'
                                    }
                                });
                            } else {
                                if (dU.red >= rut) {
                                    Bank_history.create({
                                        uid: client.UID,
                                        bank: data.bank,
                                        number: data.number,
                                        name: data.name,
                                        money: rut,
                                        type: 1,
                                        time: new Date()
                                    });
                                    UserInfo.updateOne({
                                        id: client.UID
                                    }, {
                                        $inc: {
                                            'red': -rut
                                        }
                                    }).exec();
                                    client.red({
                                        notice: {
                                            title: 'SUCCESS',
                                            text: 'Withdrawal request is being processed.'
                                        },
                                        user: {
                                            red: dU.red - rut
                                        }
                                    });
                                } else {
                                    client.red({
                                        notice: {
                                            title: 'FAILURE',
                                            text: 'Insufficient balance.!'
                                        }
                                    });
                                }
                            }
                        }

                    });
                }
            });

        }

    } else {
        client.red({
            notice: {
                title: 'ERROR',
                text: 'Please fill in all required information.!'
            }
        });
    }
}