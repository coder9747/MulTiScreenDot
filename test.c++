#include <bits/stdc++.h>
using namespace std;
int main()
{
    // give a vector<int>
    vector<int> arr = {-10, -9, -8, -10, 10, 9, 4, 2};
    vecotr<int> count(21, 0);
    for (int i{0}; i < arr.size(); ++i)
    {
        int ele = arr[i];
        count[ele + 10]++;
    }
    for (int i{0}; i < 21; ++i)
    {
        if (count[i])
        {
            cout << (i - 10) << ":" << count[i] << ' ';
        }
    }
    cout << endl;

    return 0;
}