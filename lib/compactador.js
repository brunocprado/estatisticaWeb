// Objeto compactador.
function COMPACTADOR()
{
	this.compacta = function(shapes_full,f)
	{
		var shapes = new Object();//Pontos arredondados
		var shapes_aux, lat1, lat2, lng1, lng2, myStr, myArrStr, myMVCArray;
		for (var id in shapes_full)
		{
			shapes[id] = [];
			myArrStr = "";
			for (var i in shapes_full[id])
			{
				// Passo 1: Multiplica pelo fator determinado 'f' e arredonda;
				shapes[id][i] = [];
				for (var j=0; j<shapes_full[id][i].length; j++)
				{
					shapes[id][i].push([Math.round(shapes_full[id][i][j][0]*f), Math.round(shapes_full[id][i][j][1]*f)]);
				}
				
				// Passo 2: deleta os iguais;
				shapes_aux = [];
				shapes_aux.push(shapes[id][i][0]);
				for (var j=1; j<shapes[id][i].length; j++)
				{
					lat1 = shapes_aux[shapes_aux.length-1][0];
					lng1 = shapes_aux[shapes_aux.length-1][1];
					lat2 = shapes[id][i][j][0];
					lng2 = shapes[id][i][j][1];
					if (lat1==lat2 && lng1==lng2)
						var gamb=1;
					else
						shapes_aux.push([lat2,lng2]);// se for diferente, adiciona o novo ponto!
				}
				shapes[id][i] = [];
				shapes[id][i] = shapes_aux;
				
				// Passo 2.5: deleta os "cabelinhos"
				shapes_aux = [];
				shapes_aux.push(shapes[id][i][0]);
				for (var j=1; j<shapes[id][i].length-1; j++)
				{
					if (shapes[id][i][j-1].toString() != shapes[id][i][j+1].toString())
						shapes_aux.push(shapes[id][i][j]);
				}
				shapes_aux.push(shapes[id][i][shapes[id][i].length-1]);
				shapes[id][i] = [];
				shapes[id][i] = shapes_aux;
				
				// Passo 3: guarda o primeiro ponto e cria os outros acumulando valores;
				lat1 = shapes[id][i][0][0];
				lng1 = shapes[id][i][0][1];
				shapes_aux = [];
				shapes_aux.push([lat1,lng1]);
				for (var j=1; j<shapes[id][i].length; j++)
				{
					lat2 = shapes[id][i][j][0] - lat1;
					lng2 = shapes[id][i][j][1] - lng1;
					lat1 += lat2;
					lng1 += lng2;
					shapes_aux.push([lat2,lng2]);
				}
				shapes[id][i] = [];
				shapes[id][i] = shapes_aux;
				
				// Passo 4: transforma em string e converte as sequências:[
				myStr = "";
				myStr = f.toString() + "," + shapes[id][i].toString();// concatena o fator de arredondamento, para poder automatizar o descompactador
				myStr = myStr.replace(/,0/g,"A");
				myStr = myStr.replace(/,1/g,"B");
				myStr = myStr.replace(/,-1/g,"C");
				myStr = myStr.replace(/,2/g,"D");
				myStr = myStr.replace(/,-2/g,"E");
				myStr = myStr.replace(/,3/g,"F");
				myStr = myStr.replace(/,-3/g,"G");
				myStr = myStr.replace(/,4/g,"H");
				myStr = myStr.replace(/,-4/g,"I");
				myStr = myStr.replace(/,5/g,"J");
				myStr = myStr.replace(/,-5/g,"K");
				myStr = myStr.replace(/,6/g,"L");
				myStr = myStr.replace(/,-6/g,"M");
				myStr = myStr.replace(/,7/g,"N");
				myStr = myStr.replace(/,-7/g,"O");
				myStr = myStr.replace(/,8/g,"P");
				myStr = myStr.replace(/,-8/g,"Q");
				myStr = myStr.replace(/,9/g,"R");
				myStr = myStr.replace(/,-9/g,"S");
				
				// Passo 5: Limpa do mapa os de quem tem mais que 3 vértices...
				if (shapes[id][i].length > 2)
				{
					if (myArrStr != "")
						myArrStr += " ";
					myArrStr += myStr;
				}
			}
			shapes[id] = myArrStr;
		}
		return shapes;
	}

	this.descompacta = function(string)
	{// retorna a matris pura, descompactada
		var myArray = [];
		var str, str2, arr, arr2, lat, lng, f;
		var strings = string.split(" ");
		for (var i in strings)
		{
			str = strings[i];
			str2 = '';
			arr = [];
			arr2 = [];
			for (var j=0; j<str.length; j++)
			{
				switch (str.charAt(j))
				{
					case 'A': str2 += ',0'; break;
					case 'B': str2 += ',1'; break;
					case 'C': str2 += ',-1'; break;
					case 'D': str2 += ',2'; break;
					case 'E': str2 += ',-2'; break;
					case 'F': str2 += ',3'; break;
					case 'G': str2 += ',-3'; break;
					case 'H': str2 += ',4'; break;
					case 'I': str2 += ',-4'; break;
					case 'J': str2 += ',5'; break;
					case 'K': str2 += ',-5'; break;
					case 'L': str2 += ',6'; break;
					case 'M': str2 += ',-6'; break;
					case 'N': str2 += ',7'; break;
					case 'O': str2 += ',-7'; break;
					case 'P': str2 += ',8'; break;
					case 'Q': str2 += ',-8'; break;
					case 'R': str2 += ',9'; break;
					case 'S': str2 += ',-9'; break;
					default: str2 += str.charAt(j); break;
				}
			}
			arr = str2.split(",");
			f = arr.shift();
			lng = parseInt(arr[0])/f;
			lat = parseInt(arr[1])/f;
			arr2.push([lat, lng]);
			for (var j=2; j<arr.length; j+=2)

			{
				lng += parseInt(arr[j])/f;
				lat += parseInt(arr[j+1])/f;
				arr2.push([lat, lng]);
			}
			myArray.push(arr2);
		}
		return myArray;
	}
}