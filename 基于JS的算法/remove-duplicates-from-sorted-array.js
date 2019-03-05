leetcode 26
function red(nums){
    let i=0
    nums.forEach((elem)=>{
        if(elem != nums[i]){
            nums[++i] = elem;
        }
    })
    // return nums.slice(0,i+1)
    return i+1
}
//把原来的值覆盖了
console.log(red([1,1,2]))
