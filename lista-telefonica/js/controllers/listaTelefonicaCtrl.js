angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http, $filter) {
		$scope.app = "Lista Telefonica";
		$scope.contatos = [];
		$scope.operadoras = [];
		
		var carregarContatos = function () {
				$http.get("http://localhost:3000/contacts").success(function (data, status){
					$scope.contatos = data;
				}).error(function (data, status){
					$scope.message = "Aconteceu um erro: " + status;
				});
		};
		
		var carregarOperadoras = function () {
				$http.get("http://localhost:3000/operators").success(function (data, status){
					$scope.operadoras = data;
				});
		};
		
		$scope.adicionarContato = function (contact) {
			contact.data = new Date();
			$http.post("http://localhost:3000/contacts", contact).success(function (data){
				delete $scope.contato;
				$scope.contatoForm.$setPristine();
				carregarContatos();
			});
		};
		$scope.apagarContato = function (contatos) {
			$scope.contatos = contatos.filter(function (contato){
				if(!contato.selecionado) return contato;
			});
		};
		$scope.isContatoSelecionado = function (contatos) {
			return contatos.some(function (contato) {
				return contato.selecionado;
			});
		};
		$scope.ordenarPor = function (campo) {
			$scope.criterioDeOrdenacao = campo;
			$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
		};
		
		carregarContatos();
		carregarOperadoras();
});