function selectOne(valeur) {
        $("#box1View_").find("option").each(function(e,opt){
      
            if($(opt).val()==valeur.val()) {

                // console.log($(opt).val()+'=='+valeur.val());

                var id=valeur.val();
                var name=$(opt).text();

                $("#box2View_ option[value='" + id + "']").remove();

                $("#box2View_").append('<option value="'+id+'" >'+name+'</option>');

                $("#box1View_ option[value='" + id + "']").remove();

                return;
            }
        });
    }

    function unSelectOne(valeur) {
        $("#box2View_").find("option").each(function(e,opt){
          
            if($(opt).val()==valeur.val()) {

                // console.log($(opt).val()+'=='+valeur.val());

                var id=valeur.val();
                var name=$(opt).text();

                // console.log(data);

                $("#box1View_").append('<option value="'+id+'" >'+name+'</option>');

                $("#box2View_ option[value='" + id + "']").remove();

                return;
            }
        });
    }

    function selectAll() {
        $("#box1View_").find("option").each(function(e,opt){
            selectOne($(opt));
        })
    }

    function unSelectAll() {
        $("#box2View_").find("option").each(function(e,opt){
            unSelectOne($(opt));
        })
    }