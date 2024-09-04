"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ability = void 0;
const Ability = (action, target, auth) => {
    const permission = [
        // administrator
        { role: 'administrator', action: 'manage', target: 'all' },
        // admin
        { role: 'admin', action: 'manage', target: 'flight' },
        { role: 'admin', action: 'manage', target: 'booking' },
        { role: 'admin', action: 'manage', target: 'user' },
        { role: 'admin', action: 'read', target: 'city' },
        { role: 'admin', action: 'read', target: 'airplane' },
        { role: 'admin', action: 'read', target: 'airport' },
        // customerSupport
        { role: 'customerSupport', action: 'manage', target: 'booking' },
        // technicalSupport
        { role: 'technicalSupport', action: 'manage', target: 'city' },
        { role: 'technicalSupport', action: 'manage', target: 'airport' },
        { role: 'technicalSupport', action: 'manage', target: 'airplane' },
        { role: 'technicalSupport', action: 'manage', target: 'flight' },
        { role: 'technicalSupport', action: 'manage', target: 'booking' },
        { role: 'technicalSupport', action: 'read', target: 'user' },
        // salesAgent
        { role: 'salesAgent', action: 'read', target: 'booking' },
    ];
    const Access = permission
        .filter(rules => rules.role === auth.role)
        .filter(rules => rules.target === 'all' || target === rules.target)
        .filter(rules => rules.action === 'manage' || action === rules.action)
        .length > 0;
    return Access;
};
exports.Ability = Ability;
