# Notes

### Nodes and its states...

1. Each node needs a input state and must output a state
2. Input state and output states of 2 connected states must have overlap
      - If not then just break at that point, specially in the trigger node
        otherwise we shouldn't even allow such workflow.
3. 
