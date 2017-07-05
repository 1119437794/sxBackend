<script>
     /*
    * @component 按钮组件
    * @author yxc
    * */
    export default {
        props: {
            status: {
                default: 'default'
            }
        }
    }
</script>

<template>
    <button
            :class="`btn_root-${status}`"
            @click="$emit('handleClick')"
    >
        <slot></slot>
    </button>
</template>

<style lang="scss">
    @import "Btn.scss";
</style>