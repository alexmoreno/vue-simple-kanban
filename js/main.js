
    // só pro sortable funfar no vue 2
    Vue.directive('sortable', {
        inserted: function (el, binding) {
        new Sortable(el, binding.value || {})
        }
    })


    // e aí, template aqui no extend ou na tag template?
    // passar os props todos assim ou mete tudo num vm pai e passa tudo lá?
    var list = Vue.extend({
        template: '#list-template',
        props: ['tasks', 'tasklist', 'modalProperties', 'showModalEvent'],
        
    })

    // bonitão
    var task = Vue.extend({
        template: '#task-template',
        props: ['task'],
        methods: {
            moveTask: function(){
                if (this.task.status == 4) return

                this.task.status++;

            },
            deleteTask: function(){
                if (this.task.status == 4) return

                this.task.status++;

            }
        }
    })
    // modal elegante
    var modal = Vue.extend({
        template: '#modal-template',
        methods: {
            addTask: function(){
                var val = this.taskToAdd 
                if (!val) return;

                this.tasks.push({
                    title: val.title,
                    description: val.description,
                    status: this.modalProperties.statusFilter
                })
                this.$emit('close')
            }
        },
        props: ['tasks', 'modalProperties'],
        data: function(){
            return {
                taskToAdd : {
                    title: '',
                    description: ''
                }
            }
        }


    
    })

    // 3 componentes conforme solicitado, mas acho que não precisaria de muito mais que isso
    Vue.component('task', task)
    Vue.component('list', list)
    Vue.component('modal', modal);


    // poderia puxar tudo do localStorage via watch, quem sabe isso depois
    var app = new Vue({
        el: '#app',
        methods: {
            showModalEvent: function(){
                this.showModal = true;
            }
        },
        data: {
            tasklists: [
                {
                    title: 'Pending',
                    statusFilter: '1'
                },
                {
                    title: 'Doing',
                    statusFilter: '2'
                },
                {
                    title: 'Awaiting Approval',
                    statusFilter: '3'
                },
                {
                    title: 'Done',
                    statusFilter: '4'
                }
            ],
            tasks: [
                {
                    title: 'Populate Data',
                    description: 'Create all objects which will be used by this system',
                    status: '1'
                },
                {
                    title: 'Create Components',
                    description: 'Define how components will be modeled in our application',
                    status: '1'
                },
                {
                    title: 'Create Filters',
                    description: 'Each list only shows their tasks according to its filters',
                    status: '2'
                },
                {
                    title: 'Put some colors',
                    description: 'Any color, I just do not want that black-white bootstrap default background. ',
                    status: '3'
                },
                {
                    title: 'Drag and drop tasks',
                    description: 'Drag tasks between themselves.',
                    status: '4'
                },
                {
                    title: 'Drag and drop tasks between lists',
                    description: 'Theres still a bug when I drag a task between lists. Ill do it later.',
                    status: '1'
                }

            ],
            // workaround pra funfar o modal padrão do vue e contornar 
            // o princípio da imutabilidade de propriedades pai, não me odeie por isso
            modalProperties: {
                show : false,
                statusFilter: 0
            }
            
        },
    })
