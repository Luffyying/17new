leetcode 1
/*o(n) */
function test(nums,target){
    let obj = {}
    let j = null
    for(let i=0;i<nums.length;i++){
        j = target-nums[i]
        if(obj[j]!==undefined){
            return [i,obj[j]]
        }else {
            obj[nums[i]] =i 
        }
    }
}  

//test([2,7,11,15],9)
//[2,7,11,15]   9 

/*o(n*n)*/略
