
let bpErrorModule = angular.module('bp.error', [
])
.constant('Errors', {
        email: '不是有效格式的邮件地址',
        url: '不是有效格式的url',
        required: '此项不能为空',
        same: '此项必须与密码相同',
        max: '超过上限',
        min: '低于下限',
        number: '必须为数字',
        parse: '根据验证规则，已重置无效值'
    })
.directive('bpFieldError', function ($compile) {
        "ngInject";
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var subScope = scope.$new(true);
                subScope.hasError = function () {
                    return ngModel.$invalid && ngModel.$dirty;
                };
                subScope.errors = function () {
                    return ngModel.$error;
                };
                subScope.customMessages = attrs.bpFieldError;
                var customSelector = attrs.bpFieldErrorSelector;
                var hint = $compile('<ul class="bp-field-error" ng-if="hasError()"><li ng-repeat="(name, wrong) in errors()" ng-if="wrong">{{name|error:customMessages}}</li></ul>')(subScope);
                if (customSelector) {
                    //console.warn($(customSelector));
                    $(customSelector).html(hint);
                } else {
                    element.after(hint);
                }
            }
        };
    })
.filter('error', function (Errors) {
        "ngInject";
        return function (name, customMessages) {
            if (customMessages) {
                customMessages = JSON.parse(customMessages);
            }
            var errors = angular.extend({}, Errors, customMessages);
            return errors[name] || name;
        };
    });

export default bpErrorModule;
